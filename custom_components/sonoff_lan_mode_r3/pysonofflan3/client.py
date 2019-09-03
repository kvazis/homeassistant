import binascii
import json
import logging
import random
import time
from typing import Dict, Union, Callable, Awaitable
import asyncio
import threading
import enum
import traceback

import requests
from zeroconf import ServiceBrowser, Zeroconf

from Crypto.Hash import MD5
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad, pad
from base64 import b64decode, b64encode
from Crypto.Random import get_random_bytes

import socket

class SonoffLANModeClient:
    """
    Implementation of the Sonoff LAN Mode Protocol R3(as used by the eWeLink app)
    
    Uses protocol as documented here by Itead https://github.com/itead/Sonoff_Devices_DIY_Tools/blob/master/other/SONOFF%20DIY%20MODE%20Protocol%20Doc.pdf
    """

    """
    Initialise class with connection parameters

    :param str host: host name (ip address is not supported) as hostname is the mDS servie name
    :return:
    """

    DEFAULT_TIMEOUT = 5
    DEFAULT_PING_INTERVAL = 5
    SERVICE_TYPE = "_ewelink._tcp.local."

    zeroconf = Zeroconf()

    def __init__(self, host: str,
                 event_handler: Callable[[str], Awaitable[None]],
                 ping_interval: int = DEFAULT_PING_INTERVAL,
                 timeout: int = DEFAULT_TIMEOUT,
                 logger: logging.Logger = None,
                 loop = None,
                 device_id: str = "",
                 api_key: str = ""):

        self.host = host
        self.device_id = device_id
        self.api_key = api_key
        self.logger = logger
        self.event_handler = event_handler
        self.connected_event = asyncio.Event()
        self.disconnected_event = asyncio.Event()
        self.service_browser = None
        self.loop = loop
        self.http_session = None
        self.my_service_name = None
        self.last_request = None
        self.encrypted = False

        if self.logger is None:
            self.logger = logging.getLogger(__name__)


    def connect(self):
        """
        Setup a mDNS listener
        """

        # listen for any added SOnOff
        self.service_browser = ServiceBrowser(SonoffLANModeClient.zeroconf, SonoffLANModeClient.SERVICE_TYPE, listener=self)


    def close_connection(self):

        self.logger.debug("enter close_connection()")
        self.service_browser = None
        self.disconnected_event.set()
        self.my_service_name = None


    def remove_service(self, zeroconf, type, name):

        if self.my_service_name == name:

            try:
                # hack! send a wake-up message to the switch to see if its still there
                # in testing on certain platforms (RPi) I found that the remove_service was called unexpectely when the device was available
                # this didn't occur on other platforms (Hassio VM).
                # I found that sending a HTTP REST message resulted in the device readding itself back on (via add_service) immediately
                # rather than waiting for it to occur 'naturally'
                # It could be that my Rpi is not picking up all broadcast messages and so the mDNS cache is expiring, but this has not been 
                # investigated in detail. I would value feedback from other users to see if this 'hack' is called for their setup
                
                self.send_signal_strength(self.get_update_payload(self.device_id, None))
                self.logger.debug("Service %s removed (but hack worked)" % name)

            except OSError:
                self.logger.info("Service %s removed" % name)
                self.close_connection()

        #else:
        #    self.logger.debug("Service %s removed (not our switch)" % name)


    def add_service(self, zeroconf, type, name):

        if self.my_service_name is not None:
        
            if self.my_service_name == name:
                self.logger.debug("Service %s added (again, likely after hack)" % name)
                self.my_service_name = None

            #else:
            #    self.logger.debug("Service %s added (not our switch)" % name)

        if self.my_service_name is None:
        
            info = zeroconf.get_service_info(type, name)
            found_ip = self.parseAddress(info.address)

            if self.device_id is not None:

                if name == "eWeLink_" + self.device_id + "." + SonoffLANModeClient.SERVICE_TYPE:
                    self.my_service_name = name

            elif self.host is not None:

                try:

                    if socket.gethostbyname(self.host) == found_ip:
                        self.my_service_name = name

                except TypeError:

                    if self.host == found_ip:
                        self.my_service_name = name

            if self.my_service_name is not None:

                self.logger.info("Service type %s of name %s added", type, name) 

                # listen for updates to the specific device
                self.service_browser = ServiceBrowser(zeroconf, name, listener=self)

                # create an http session so we can use http keep-alives
                self.http_session = requests.Session()

                # add the http headers
                headers = { 'Content-Type': 'application/json;charset=UTF-8',
                    'Accept': 'application/json',
                    'Accept-Language': 'en-gb'        
                }    
                self.http_session.headers.update(headers)

                # find socket for end-point
                socket_text = found_ip + ":" + str(info.port)          
                self.logger.debug("service is at %s", socket_text)
                self.url = 'http://' + socket_text

                # setup retries (https://urllib3.readthedocs.io/en/latest/reference/urllib3.util.html#urllib3.util.retry.Retry)
                from requests.adapters import HTTPAdapter
                from urllib3.util.retry import Retry

                # no retries at moment using requests class, control in sonoffdevice (review after seeing what failure we get)
                retries = Retry(total=0, backoff_factor=0.5, method_whitelist=['POST'], status_forcelist=None)
                self.http_session.mount('http://', HTTPAdapter(max_retries=retries))

                # process the initial message
                self.update_service(zeroconf, type, name)


    def update_service(self, zeroconf, type, name):

        info = zeroconf.get_service_info(type, name)
        self.logger.debug("properties: %s",info.properties)

        if info.properties.get(b'encrypt'):
            # decrypt the message
            iv = info.properties.get(b'iv')
            data1 = info.properties.get(b'data1')
            if len(data1) == 249:
                data2 = info.properties.get(b'data2')
                data1 += data2

                if len(data2) == 249:
                    data3 = info.properties.get(b'data3')
                    data1 += data3

                    if len(data3) == 249:
                        data4 = info.properties.get(b'data4')
                        data1 += data4

            plaintext = self.decrypt(data1,iv)
            data = plaintext
            self.logger.debug("decrypted data: %s", plaintext)
            self.encrypted = True

        else:
            data = info.properties.get(b'data1')
            self.encrypted = False

        self.properties = info.properties

        # process the events on an event loop (this method is on a background thread called from zeroconf)
        asyncio.run_coroutine_threadsafe(self.event_handler(data), self.loop)


    def send_switch(self, request: Union[str, Dict]):

        return self.send(request, self.url + '/zeroconf/switch')


    def send_signal_strength(self, request: Union[str, Dict]):

        return self.send(request, self.url + '/zeroconf/signal_strength')


    def send(self, request: Union[str, Dict], url):
        """
        Send message to an already-connected Sonoff LAN Mode Device
        and return the response.
        :param request: command to send to the device (can be dict or json)
        :return:
        """
        self.logger.debug('Sending http message to %s: %s ', url, request)      
        response = self.http_session.post(url, json=request)
        self.logger.debug('response received: %s %s', response, response.content) 

        response_json = json.loads(response.content)

        error = response_json['error']

        if error != 0:
            self.logger.warn('error received: %s, %s', self.device_id, response.content)
            # no need to process error, retry will resend message which should be sufficient

        else:
            self.logger.debug('message sent to switch successfully') 
            # no need to do anything here, the update is processed via the mDNS TXT record update


    def get_update_payload(self, device_id: str, params: dict) -> Dict:

        payload = {
            'sequence': str(int(time.time())), # ensure this field isn't too long, otherwise buffer overflow type issue caused in the device
            'deviceid': device_id,
            'selfApikey': '123',  # This field needs to exist, but no idea what it is used for (https://github.com/itead/Sonoff_Devices_DIY_Tools/issues/5)
            'data': params
        }

        self.logger.debug('message to send (plaintext): %s', payload)

        if self.encrypted:

            if self.api_key != "" and self.api_key is not None:
                self.format_encryption(payload)
                self.logger.debug('encrypted: %s', payload)
            else:
                self.logger.error('missing api_key field for device: %s', self.device_id) 

        else:
            payload["encrypt"] = False

        return payload

        
    """ Encrpytion routines as documented in https://github.com/itead/Sonoff_Devices_DIY_Tools/blob/master/other/SONOFF%20DIY%20MODE%20Protocol%20Doc.pdf
    
    Here are an abstract of the document with the partinent parts for the alogrithm
    
        The default password must be the API Key of the device. 
        
        The key used for encryption is the MD5 hash of the device password (16 bytes)
        
        The initialization vector iv used for encryption is a 16-byte random number, Base64 encoded as a string
        
        The encryption algorithm must be "AES-128-CBC/PKCS7Padding" (AES 128 Cipher Block Chaining (CBC) with PKCS7 Padding)
        
        When the device information (unencrypted or encrypted string) is longer than 249 bytes, the first 249 bytes must be stored in data1, and the remaining bytes are divided by length 249, which are stored in data2, data3, and data4.
        
        [This last part is currently unimplemented as I haven't seen a mesage longer than 249 bytes as yet, proably will have on multi-channel devices]
        
        
    """

    def format_encryption(self, data):

        encrypt = True
        data["encrypt"] = encrypt
        if encrypt:
            iv = self.generate_iv()
            data["iv"] = b64encode(iv).decode("utf-8") 

            if data["data"] is None:
                # data["data"] = self.encrypt("{ }", iv)
                data["data"] = ""
            else:
                data["data"] = self.encrypt(json.dumps(data["data"]), iv)


    def encrypt(self, data_element, iv):

        api_key = bytes(self.api_key, 'utf-8') 
        plaintext = bytes(data_element, 'utf-8')

        hash = MD5.new()
        hash.update(api_key)
        key = hash.digest()

        cipher = AES.new(key, AES.MODE_CBC, iv=iv)     
        padded = pad(plaintext, AES.block_size)
        ciphertext = cipher.encrypt(padded)
        encoded = b64encode(ciphertext) 

        return encoded.decode("utf-8")


    def generate_iv(self):
        return get_random_bytes(16)


    def decrypt(self, data_element, iv):

        try:

            api_key = bytes(self.api_key, 'utf-8')
            encoded =  data_element

            hash = MD5.new()
            hash.update(api_key)
            key = hash.digest()

            cipher = AES.new(key, AES.MODE_CBC, iv=b64decode(iv))
            ciphertext = b64decode(encoded)        
            padded = cipher.decrypt(ciphertext)
            plaintext = unpad(padded, AES.block_size)

        except Exception as ex:
            self.logger.error('Error decrypting for device %s: %s, probably wrong API key', self.device_id, format(ex)) 

        return plaintext


    def parseAddress(self, address):
        """
        Resolve the IP address of the device
        :param address:
        :return: add_str
        """
        add_list = []
        for i in range(4):
            add_list.append(int(address.hex()[(i * 2):(i + 1) * 2], 16))
        add_str = str(add_list[0]) + "." + str(add_list[1]) + \
            "." + str(add_list[2]) + "." + str(add_list[3])
        return add_str

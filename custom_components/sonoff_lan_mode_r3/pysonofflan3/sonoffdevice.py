"""
pysonofflan
Python library supporting Sonoff Smart Devices (Basic/S20/Touch) in LAN Mode.
"""
import asyncio
import json
import logging
from typing import Callable, Awaitable, Dict

import traceback

from .client import SonoffLANModeClient


class SonoffDevice(object):
    def __init__(self,
                 host: str,
                 callback_after_update: Callable[..., Awaitable[None]] = None,
                 shared_state: Dict = None,
                 logger=None,
                 loop=None,
                 ping_interval=SonoffLANModeClient.DEFAULT_PING_INTERVAL,
                 timeout=SonoffLANModeClient.DEFAULT_TIMEOUT,
                 context: str = None,
                 device_id: str = "",
                 api_key: str = "") -> None:
        """
        Create a new SonoffDevice instance.

        :param str host: host name or ip address on which the device listens
        :param context: optional child ID for context in a parent device
        """
        self.callback_after_update = callback_after_update
        self.host = host
        self.context = context
        self.api_key = api_key
        self.shared_state = shared_state
        self.basic_info = None
        self.params = {"switch": "unknown"}
        self.loop = loop
        self.tasks = []
        self.new_loop = False

        if logger is None:
            self.logger = logging.getLogger(__name__)
        else:
            self.logger = logger

        try:
            if self.loop is None:

                self.new_loop = True
                self.loop = asyncio.new_event_loop()
                asyncio.set_event_loop(self.loop)

            self.logger.debug(
                'Initializing SonoffLANModeClient class in SonoffDevice')
            self.client = SonoffLANModeClient(
                host,
                self.handle_message,
                ping_interval=ping_interval,
                timeout=timeout,
                logger=self.logger,
                loop=self.loop,
                device_id=device_id,
                api_key=api_key
            )

            self.message_ping_event = asyncio.Event()
            self.message_acknowledged_event = asyncio.Event()
            self.params_updated_event = asyncio.Event()

            self.client.connect()
             
            self.tasks.append(
                self.loop.create_task(self.send_availability_loop()))

            self.send_updated_params_task = \
                self.loop.create_task(self.send_updated_params_loop())
            self.tasks.append(self.send_updated_params_task)

            if self.new_loop:
                self.loop.run_until_complete(self.send_updated_params_task)

        except asyncio.CancelledError:
            self.logger.debug('SonoffDevice loop ended, returning')

    def calculate_retry(self, retry_count):

        try:

            # increasing backoff each retry attempt
            wait_seconds = [2, 5, 10, 30, 60]

            if retry_count >= len(wait_seconds):
                retry_count = len(wait_seconds) - 1

            return wait_seconds[retry_count]

        except Exception as ex:
            self.logger.error('Unexpected error in wait_before_retry(): %s',
                format(ex))

    async def send_availability_loop(self):

        self.logger.debug('enter send_availability_loop()')

        try:
            while True:

                self.logger.debug('waiting for connection')

                await self.client.connected_event.wait()
                self.client.disconnected_event.clear()

                self.logger.debug('connected event, sending update')

                if self.callback_after_update is not None:
                    await self.callback_after_update(self)

                self.logger.debug('waiting for disconnection')

                await self.client.disconnected_event.wait()
                self.client.connected_event.clear()

                self.logger.debug('disconnected event, sending update')

                if self.callback_after_update is not None:
                    await self.callback_after_update(self)

        finally:
            self.logger.debug('exiting send_availability_loop()')


    async def send_updated_params_loop(self):

        self.logger.debug(
            'send_updated_params_loop is active on the event loop')

        retry_count = 0

        try:

            self.logger.debug(
                'Starting loop waiting for device params to change')

            while True:
                self.logger.debug(
                    'send_updated_params_loop now awaiting event')

                await self.params_updated_event.wait()

                await self.client.connected_event.wait()
                self.logger.debug('Connected!')                

                update_message = self.client.get_update_payload(
                    self.device_id,
                    self.params
                )

                try:
                    self.message_ping_event.clear()
                    self.message_acknowledged_event.clear()

                    await self.loop.run_in_executor(None,
                        self.client.send_switch, update_message)
                            
                    await asyncio.wait_for(
                        self.message_ping_event.wait(),
                        self.calculate_retry(retry_count))

                    if self.message_acknowledged_event.is_set():
                        self.params_updated_event.clear()
                        self.logger.debug('Update message sent, '
                            'event cleared, should loop now')
                        retry_count = 0
                    else:
                        self.logger.info(
                            "we didn't get a confirmed acknowledgement, "
                            "state has changed in between retry!")
                        retry_count += 1
                    
                except asyncio.TimeoutError:
                    self.logger.warn(
                        'Device: %s. Update message not received in timeout period, retry', self.device_id)
                    retry_count += 1

                except asyncio.CancelledError:
                    self.logger.debug('send_updated_params_loop cancelled')
                    break

                except OSError as ex:
                    if retry_count == 0:
                        self.logger.warn('Connection issue for device %s: %s', self.device_id, format(ex))
                    else:
                        self.logger.debug('Connection issue for device %s: %s', self.device_id, format(ex))

                    await asyncio.sleep(self.calculate_retry(retry_count))
                    retry_count += 1

                except Exception as ex:
                    self.logger.error('Unexpected error for device %s: %s %s', self.device_id, format(ex), traceback.format_exc)
                    break

        except asyncio.CancelledError:
            self.logger.debug('send_updated_params_loop cancelled')

        except Exception as ex:
            self.logger.error('Unexpected error for device %s: %s %s', self.device_id, format(ex), traceback.format_exc)

        finally:
            self.logger.debug('send_updated_params_loop finally block reached')

    def update_params(self, params):

        if self.params != params:

            self.logger.debug(
                'Scheduling params update message to device: %s' % params)
            self.params = params
            self.params_updated_event.set()
        else:
            self.logger.debug('unnecessary update received, ignoring')

    async def handle_message(self, message):
        """
        Receive message sent by the device and handle it, either updating
        state or storing basic device info
        """

        self.logger.debug('enter handle_mesage()')

        self.message_ping_event.set()

        response = json.loads(message)

        if ('switch' in response):
            self.logger.debug(
                'Message: Received status from device, storing in instance')
            self.basic_info = response
            self.basic_info['deviceid'] = self.host

            self.client.connected_event.set()

            send_update = False

            # is there is a new message queued to be sent
            if self.params_updated_event.is_set():
                
                # only send client update message if the change has been successful
                if self.params['switch'] == response['switch']:
 
                    self.message_acknowledged_event.set()
                    send_update = True
                    self.logger.debug('expected update received from switch: %s',
                        response['switch'])

                else:                   
                    self.logger.info(
                        'failed update! state is: %s, expecting: %s',
                        response['switch'], self.params['switch'])

            else:                                          
                # this is a status update message originating from the device
                # only send client update message if the status has changed

                self.logger.info(
                    'unsolicited update received from switch: %s',
                    response['switch'])

                if self.params['switch'] != response['switch']:       
                    self.params = {"switch": response['switch']}
                    send_update = True

            if send_update and self.callback_after_update is not None:
                await self.callback_after_update(self)

        else:
            self.logger.error(
                'Unknown message received from device: ' % message)
            raise Exception('Unknown message received from device')
    
    
    def shutdown_event_loop(self):
        self.logger.debug('shutdown_event_loop called')

        try:
            # Hide Cancelled Error exceptions during shutdown
            def shutdown_exception_handler(loop, context):
                if "exception" not in context \
                    or not isinstance(context["exception"],
                                      asyncio.CancelledError):
                    loop.default_exception_handler(context)

            self.loop.set_exception_handler(shutdown_exception_handler)

            # Handle shutdown gracefully by waiting for all tasks
            # to be cancelled
            tasks = asyncio.gather(
                *self.tasks,
                loop=self.loop,
                return_exceptions=True
            )

            if self.new_loop:
                tasks.add_done_callback(lambda t: self.loop.stop())

            tasks.cancel()

            # Keep the event loop running until it is either
            # destroyed or all tasks have really terminated
            if self.new_loop:
                while (
                    not tasks.done()
                    and not self.loop.is_closed()
                    and not self.loop.is_running()
                ):
                    self.loop.run_forever()

        except Exception as ex:
            self.logger.error(
                'Unexpected error in shutdown_event_loop(): %s',
                format(ex))

        finally:
            if self.new_loop:

                if (
                    hasattr(self.loop, "shutdown_asyncgens")
                    and not self.loop.is_running()
                ):
                    # Python 3.5
                    self.loop.run_until_complete(
                        self.loop.shutdown_asyncgens()
                    )
                    self.loop.close()

    @property
    def device_id(self) -> str:
        """
        Get current device ID (immutable value based on hardware MAC address)

        :return: Device ID.
        :rtype: str
        """
        return self.client.properties[b'id'].decode("utf-8")

    async def turn_off(self) -> None:
        """
        Turns the device off.
        """
        raise NotImplementedError("Device subclass needs to implement this.")

    @property
    def is_off(self) -> bool:
        """
        Returns whether device is off.

        :return: True if device is off, False otherwise.
        :rtype: bool
        """
        return not self.is_on

    async def turn_on(self) -> None:
        """
        Turns the device on.
        """
        raise NotImplementedError("Device subclass needs to implement this.")

    @property
    def is_on(self) -> bool:
        """
        Returns whether the device is on.

        :return: True if the device is on, False otherwise.
        :rtype: bool
        :return:
        """
        raise NotImplementedError("Device subclass needs to implement this.")

    def __repr__(self):
        return "<%s at %s>" % (
            self.__class__.__name__,
            self.device_id)

    @property
    def available(self) -> bool:

        return self.client.connected_event.is_set()

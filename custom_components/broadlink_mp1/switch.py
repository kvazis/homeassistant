"""Support for Broadlink MP1 devices."""
import binascii
from datetime import timedelta
import logging
import socket

import voluptuous as vol

from homeassistant.components.switch import (
    ENTITY_ID_FORMAT, PLATFORM_SCHEMA, SwitchDevice)
from homeassistant.const import (
    CONF_COMMAND_OFF, CONF_COMMAND_ON, CONF_FRIENDLY_NAME, CONF_HOST, CONF_MAC,
    CONF_SWITCHES, CONF_TIMEOUT, CONF_TYPE)
import homeassistant.helpers.config_validation as cv
from homeassistant.util import Throttle, slugify

from . import data_packet

_LOGGER = logging.getLogger(__name__)

TIME_BETWEEN_UPDATES = timedelta(seconds=5)

DEFAULT_NAME = 'Broadlink switch'
DEFAULT_TIMEOUT = 10

MP1_TYPES = ['mp11','mp12','mp13','mp14']

SWITCH_TYPES = MP1_TYPES

SWITCH_SCHEMA = vol.Schema({
    vol.Optional(CONF_COMMAND_OFF): data_packet,
    vol.Optional(CONF_COMMAND_ON): data_packet,
    vol.Optional(CONF_FRIENDLY_NAME): cv.string,
})

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_SWITCHES, default={}):
        cv.schema_with_slug_keys(SWITCH_SCHEMA),
    vol.Required(CONF_HOST): cv.string,
    vol.Required(CONF_MAC): cv.string,
    vol.Optional(CONF_FRIENDLY_NAME, default=DEFAULT_NAME): cv.string,
    vol.Optional(CONF_TYPE, default=SWITCH_TYPES[0]): vol.In(SWITCH_TYPES),
    vol.Optional(CONF_TIMEOUT, default=DEFAULT_TIMEOUT): cv.positive_int
})


def setup_platform(hass, config, add_entities, discovery_info=None):
    """Set up the Broadlink switches."""
    import broadlink
    devices = config.get(CONF_SWITCHES)
    ip_addr = config.get(CONF_HOST)
    friendly_name = config.get(CONF_FRIENDLY_NAME)
    mac_addr = binascii.unhexlify(
        config.get(CONF_MAC).encode().replace(b':', b''))
    switch_type = config.get(CONF_TYPE)
	
    broadlink_device = broadlink.mp1((ip_addr, 80), mac_addr, None)
    if switch_type == "mp11":
        switches = [BroadlinkMP11Switch(friendly_name, broadlink_device)]
    if switch_type == "mp12":
        switches = [BroadlinkMP12Switch(friendly_name, broadlink_device)]
    if switch_type == "mp13":
        switches = [BroadlinkMP13Switch(friendly_name, broadlink_device)]			
    if switch_type == "mp14":
        switches = [BroadlinkMP14Switch(friendly_name, broadlink_device)]

    broadlink_device.timeout = config.get(CONF_TIMEOUT)
    try:
        broadlink_device.auth()
    except OSError:
        _LOGGER.error("Failed to connect to device")

    add_entities(switches)

class BroadlinkMP1(SwitchDevice):
    """Representation of an Broadlink switch."""

    def __init__(self, name, friendly_name, device, command_on, command_off):
        """Initialize the switch."""
        self.entity_id = ENTITY_ID_FORMAT.format(slugify(name))
        self._name = friendly_name
        self._state = False
        self._command_on = 1
        self._command_off = 0
        self._device = device
        self._load_power = None
		
    @property
    def name(self):
        """Return the name of the switch."""
        return self._name

    @property
    def assumed_state(self):
        """Return true if unable to access real state of entity."""
        return False

    @property
    def should_poll(self):
        """Return the polling state."""
        return True
		
    @Throttle(TIME_BETWEEN_UPDATES)
    def update(self):
        """Fetch new state data for this device."""
        self._update()
		
    @property
    def is_on(self):
        """Return true if device is on."""
        return self._state

    def turn_on(self, **kwargs):
        """Turn the device on."""
        if self._sendpacket(self._command_on):
            self._state = True
            self.schedule_update_ha_state()

    def turn_off(self, **kwargs):
        """Turn the device off."""
        if self._sendpacket(self._command_off):
            self._state = False
            self.schedule_update_ha_state()

    def _auth(self, retry=2):
        try:
            auth = self._device.auth()
        except OSError:
            auth = False
            if retry < 1:
                _LOGGER.error("Timeout during authorization")
        if not auth and retry > 0:
            return self._auth(retry-1)
        return auth


class BroadlinkMP11Switch(BroadlinkMP1):
    """Representation of an Broadlink switch."""
	
    def __init__(self, friendly_name, device):
        """Initialize the switch."""
        super().__init__(friendly_name, friendly_name, device, None, None)
		
    def _sendpacket(self, packet, retry=2):
        """Send packet to device."""
        try:
            self._device.set_power(1, packet)
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during sending a packet: %s", error)
                return False
            if not self._auth():
                return False
            return self._sendpacket(packet, max(0, retry-1))
        return True

    def _update(self, retry=2):
        """Update the state of the device."""
        try:
            state1 = self._device.check_power()
            state = state1['s1']
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during updating the state: %s", error)
                return
            if not self._auth():
                return
            return self._update(retry-1)
        if state is None and retry > 0:
            return self._update(retry-1)
        self._state = state

class BroadlinkMP12Switch(BroadlinkMP1):
    """Representation of an Broadlink switch."""
	
    def __init__(self, friendly_name, device):
        """Initialize the switch."""
        super().__init__(friendly_name, friendly_name, device, None, None)

    def _sendpacket(self, packet, retry=2):
        """Send packet to device."""
        try:
            self._device.set_power(2, packet)
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during sending a packet: %s", error)
                return False
            if not self._auth():
                return False
            return self._sendpacket(packet, max(0, retry-1))
        return True

    def _update(self, retry=2):
        """Update the state of the device."""
        try:
            state2 = self._device.check_power()
            state = state2['s2']
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during updating the state: %s", error)
                return
            if not self._auth():
                return
            return self._update(retry-1)
        if state is None and retry > 0:
            return self._update(retry-1)
        self._state = state

class BroadlinkMP13Switch(BroadlinkMP1):
    """Representation of an Broadlink switch."""
	
    def __init__(self, friendly_name, device):
        """Initialize the switch."""
        super().__init__(friendly_name, friendly_name, device, None, None)

    def _sendpacket(self, packet, retry=2):
        """Send packet to device."""
        try:
            self._device.set_power(3, packet)
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during sending a packet: %s", error)
                return False
            if not self._auth():
                return False
            return self._sendpacket(packet, max(0, retry-1))
        return True

    def _update(self, retry=2):
        """Update the state of the device."""
        try:
            state3 = self._device.check_power()
            state = state3['s3']
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during updating the state: %s", error)
                return
            if not self._auth():
                return
            return self._update(retry-1)
        if state is None and retry > 0:
            return self._update(retry-1)
        self._state = state

class BroadlinkMP14Switch(BroadlinkMP1):
    """Representation of an Broadlink switch."""
	
    def __init__(self, friendly_name, device):
        """Initialize the switch."""
        super().__init__(friendly_name, friendly_name, device, None, None)

    def _sendpacket(self, packet, retry=2):
        """Send packet to device."""
        try:
            self._device.set_power(4, packet)
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during sending a packet: %s", error)
                return False
            if not self._auth():
                return False
            return self._sendpacket(packet, max(0, retry-1))
        return True

    def _update(self, retry=2):
        """Update the state of the device."""
        try:
            state4 = self._device.check_power()
            state = state4['s4']
        except (socket.timeout, ValueError) as error:
            if retry < 1:
                _LOGGER.error("Error during updating the state: %s", error)
                return
            if not self._auth():
                return
            return self._update(retry-1)
        if state is None and retry > 0:
            return self._update(retry-1)
        self._state = state

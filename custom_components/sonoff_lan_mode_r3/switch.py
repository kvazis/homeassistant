"""
Support for Sonoff smart home devices, such as smart switches (e.g. Sonoff
Basic), plugs (e.g. Sonoff S20), and wall switches (e.g. Sonoff Touch),
when these devices are in "LAN Mode", directly over the local network.

For more details about this platform, please refer to the documentation at
https://github.com/beveradb/sonoff-lan-mode-homeassistant
"""
import logging

import homeassistant.helpers.config_validation as cv
import voluptuous as vol
from homeassistant.components.switch import (SwitchDevice, PLATFORM_SCHEMA)
from homeassistant.const import CONF_HOST, CONF_NAME, CONF_ICON, CONF_API_KEY

REQUIREMENTS = ['pysonofflan==0.3.0']

_LOGGER = logging.getLogger('homeassistant.components.switch.sonoff_lan_mode_r3')

DEFAULT_NAME = 'Sonoff Switch'
DEFAULT_ICON = 'mdi:flash'
CONF_DEVICE_ID = 'device_id'

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend({
    vol.Optional(CONF_HOST): cv.string,
    vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
    vol.Optional(CONF_ICON, default=DEFAULT_ICON) : cv.string,
    vol.Optional(CONF_DEVICE_ID): cv.string,
    vol.Optional(CONF_API_KEY) : cv.string
})


async def async_setup_platform(hass, config, async_add_entities,
                               discovery_info=None):
    """Set up the Sonoff LAN Mode Switch platform."""
    host = config.get(CONF_HOST)
    name = config.get(CONF_NAME)
    icon = config.get(CONF_ICON)
    device_id = config.get(CONF_DEVICE_ID)
    api_key = config.get(CONF_API_KEY)

    # todo: remove once we have packaged correctly
    # Add path so we can load dependant component (pysonofflan) from custom_components directory
    # this support side by side execution 
    import sys
    path = hass.config.path('custom_components/sonoff_lan_mode_r3')
    if path not in sys.path:
        sys.path.insert(0, path)

    async_add_entities([HassSonoffSwitchR3(hass, host, name, icon, device_id, api_key)], True)


class HassSonoffSwitchR3(SwitchDevice):
    """Home Assistant representation of a Sonoff LAN Mode device."""

    def __init__(self, hass, host, name, icon, device_id, api_key):
            
        from pysonofflan3 import SonoffSwitch

        self._name = name
        self._icon = icon
        self._state = None
        self._available = False
        self._shared_state = {}

        self._device_id = device_id
        self._api_key = api_key

        self._sonoff_device = SonoffSwitch(
            host=host,
            callback_after_update=self.device_update_callback,
            shared_state=self._shared_state,
            logger=_LOGGER,
            loop=hass.loop,
            ping_interval=145,
            device_id=device_id,
            api_key=api_key
        )

        _LOGGER.debug("HassSonoffSwitch __init__ finished creating "
                      "SonoffSwitch")

    @property
    def icon(self):
        """Return the icon to use in the frontend, if any."""
        return self._icon

    @property
    def name(self):
        _LOGGER.debug("HassSonoffSwitch returning _name: %s" % self._name)
        return self._name

    @property
    def available(self) -> bool:
        """Return if switch is available."""
        _LOGGER.debug("HassSonoffSwitch returning _available: %s" %
                      self._available)
        return self._available

    @property
    def is_on(self):
        """Return true if switch is on."""
        _LOGGER.debug("HassSonoffSwitch returning _state: %s" % self._state)
        return self._state

    async def turn_on(self, **kwargs):
        """Turn the switch on."""
        _LOGGER.info("Sonoff LAN Mode switch %s switching on" % self._name)
        await self._sonoff_device.turn_on()

    async def turn_off(self, **kwargs):
        """Turn the switch off."""
        _LOGGER.info("Sonoff LAN Mode switch %s switching off" % self._name)
        await self._sonoff_device.turn_off()

    async def device_update_callback(self, callback_self):
        """Handle state updates announced by the device itself."""
        _LOGGER.info(
            "Sonoff LAN Mode switch %s received updated state from "
            "the device: %s, available: %s" % (self._name,
                                self._sonoff_device.state,
                                self._sonoff_device.available)
        )

        await self.async_update()

    @property
    def should_poll(self) -> bool:
        return False

    async def async_update(self):
        """Update the device state."""
        _LOGGER.debug("HassSonoffSwitch async_update called")
        try:
            if self._sonoff_device.basic_info is None:
                _LOGGER.debug(
                    "Sonoff device basic info still none, waiting for init "
                    "message")
                return

            self._available = self._sonoff_device.available

            self._state = \
                self._sonoff_device.state == \
                self._sonoff_device.SWITCH_STATE_ON

            self.async_schedule_update_ha_state()

        except Exception as ex:
            if self._available:
                _LOGGER.warning(
                    "Could not read state for %s: %s", self.name, ex)

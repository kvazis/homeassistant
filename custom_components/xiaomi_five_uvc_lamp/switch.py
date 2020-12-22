import asyncio
from functools import partial
import logging

import voluptuous as vol

import homeassistant.helpers.config_validation as cv
from homeassistant.components.switch import SwitchEntity, PLATFORM_SCHEMA
from homeassistant.const import CONF_NAME, CONF_HOST, CONF_TOKEN
from homeassistant.exceptions import PlatformNotReady

_LOGGER = logging.getLogger(__name__)

DEFAULT_NAME = "Xiaomi Five UVC Lamp"
DATA_KEY = "switch.xiaomi_five_uvc_lamp"

CONF_TURN_ON_COMMAND = "turn_on_command"
CONF_TURN_ON_PARAMETERS = "turn_on_parameters"
CONF_TURN_OFF_COMMAND = "turn_off_command"
CONF_TURN_OFF_PARAMETERS = "turn_off_parameters"
CONF_STATE_PROPERTY = "state_property"
CONF_STATE_PROPERTY_GETTER = "state_property_getter"
CONF_STATE_ON_VALUE = "state_on_value"
CONF_STATE_OFF_VALUE = "state_off_value"
CONF_UPDATE_INSTANT = "update_instant"

ATTR_STATE_PROPERTY = "state_property"
ATTR_STATE_VALUE = "state_value"

PLATFORM_SCHEMA = PLATFORM_SCHEMA.extend(
    {
        vol.Required(CONF_HOST): cv.string,
        vol.Required(CONF_TOKEN): vol.All(cv.string, vol.Length(min=32, max=32)),
        vol.Optional(CONF_NAME, default=DEFAULT_NAME): cv.string,
    }
)

ATTR_MODEL = "model"
ATTR_FIRMWARE_VERSION = "firmware_version"
ATTR_HARDWARE_VERSION = "hardware_version"

SUCCESS = ["ok"]


# pylint: disable=unused-argument
@asyncio.coroutine
def async_setup_platform(hass, config, async_add_devices, discovery_info=None):
    """Set up the sensor from config."""
    from miio import Device, DeviceException

    if DATA_KEY not in hass.data:
        hass.data[DATA_KEY] = {}

    host = config.get(CONF_HOST)
    token = config.get(CONF_TOKEN)

    _LOGGER.info("Initializing with host %s (token %s...)", host, token[:5])

    try:
        miio_device = Device(host, token)
        device_info = miio_device.info()
        model = device_info.model
        _LOGGER.info(
            "%s %s %s detected",
            model,
            device_info.firmware_version,
            device_info.hardware_version,
        )

        device = XiaomiFiveUVCLampDevice(miio_device, config, device_info)
    except DeviceException:
        raise PlatformNotReady

    hass.data[DATA_KEY][host] = device
    async_add_devices([device], update_before_add=True)

# commands are taken from https://github.com/skysilver-lab/majordomo-xiaomimiio/commit/d08b284fa78745e94528f4ba0d78caebe1c04b0a
class XiaomiFiveUVCLampDevice(SwitchEntity):
    def __init__(self, device, config, device_info):
        self._device = device

        self._name = config.get(CONF_NAME)
        self._state_property = []
        self._skip_update = False

        self._model = device_info.model
        self._unique_id = "{}-{}".format(device_info.model, device_info.mac_address)
        self._icon = "mdi:flask-outline"

        self._available = None
        self._state = None
        self._state_attrs = {
            ATTR_MODEL: self._model,
            ATTR_FIRMWARE_VERSION: device_info.firmware_version,
            ATTR_HARDWARE_VERSION: device_info.hardware_version,
            ATTR_STATE_PROPERTY: self._state_property,
        }

    @property
    def should_poll(self):
        """Poll the miio device."""
        return True

    @property
    def unique_id(self):
        """Return an unique ID."""
        return self._unique_id

    @property
    def name(self):
        """Return the name of this entity, if any."""
        return self._name

    @property
    def icon(self):
        """Return the icon to use for device if any."""
        return self._icon

    @property
    def available(self):
        """Return true when state is known."""
        return self._available

    @property
    def is_on(self):
        """Return true if switch is on."""
        return self._state

    @property
    def device_state_attributes(self):
        """Return the state attributes of the device."""
        return self._state_attrs

    async def _try_command(self, mask_error, func, *args, **kwargs):
        """Call a device command handling error messages."""
        from miio import DeviceException

        try:
            result = await self.hass.async_add_job(partial(func, *args, **kwargs))

            _LOGGER.info("Response received from miio device: %s", result)

            return result == SUCCESS
        except DeviceException as exc:
            _LOGGER.error(mask_error, exc)
            return False

    async def async_turn_on(self, **kwargs):
        """Turn on."""
        result = await self._try_command(
            "Turning the miio device on failed.",
            self._device.send,
            'set_properties',
            [{"did":"power","siid":2,"piid":2,"value":True}],
        )

        if result:
            self._state = True
            self._skip_update = True

    async def async_turn_off(self, **kwargs):
        result = await self._try_command(
            "Turning the miio device off failed.",
            self._device.send,
            'set_properties',
            [{"did":"power","siid":2,"piid":2,"value":False}],
        )

        if result:
            self._state = False
            self._skip_update = True

    async def async_update(self):
        from miio import DeviceException

        try:
            state = await self.hass.async_add_job(
                self._device.send, 'get_properties', 
                [
                    {"did":"power","siid":2,"piid":2},
                    # {"did":"state_code","siid":2,"piid":3},
                    # {"did":"poweroff_time","siid":2,"piid":6},
                    # {"did":"countdown","siid":2,"piid":7},
                    # {"did":"child_lock","siid":4,"piid":1}
                ]
            )
            state = state.pop()

            _LOGGER.debug("Got new state: %s", state)

            self._available = True

            if state == {'did': 'power', 'siid': 2, 'piid': 2, 'code': 0, 'value': True}:
                self._state = True
            elif state == {'did': 'power', 'siid': 2, 'piid': 2, 'code': 0, 'value': False}:
                self._state = False
            else:
                _LOGGER.warning("New state (%s)", state)
                self._state = None

            self._state_attrs.update({ATTR_STATE_VALUE: state})

        except DeviceException as ex:
            self._available = False
            _LOGGER.error("Got exception while fetching the state: %s", ex)
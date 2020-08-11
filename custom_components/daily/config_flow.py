"""Config flow for Daily Sensor integration."""
from .const import (  # pylint: disable=unused-import
    DOMAIN,
    CONF_INPUT_SENSOR,
    CONF_OPERATION,
    CONF_NAME,
    CONF_UNIT_OF_MEASUREMENT,
    CONF_INTERVAL,
    NAME,
    VALID_OPERATIONS,
    DEFAULT_INTERVAL,
)

import logging
import voluptuous as vol

from homeassistant import config_entries, exceptions

_LOGGER = logging.getLogger(__name__)


class DailySensorConfigFlowHandler(config_entries.ConfigFlow, domain=DOMAIN):
    """Handle a config flow for Daily Sensor."""

    VERSION = 1
    CONNECTION_CLASS = config_entries.CONN_CLASS_CLOUD_POLL

    def __init__(self):
        """Initialize."""
        self._name = NAME
        self._operation = ""
        self._input_sensor = ""
        self._unit_of_measurement = "unknown"
        self._errors = {}

    async def async_step_user(self, user_input=None):
        """Handle a flow initialized by the user."""
        self._errors = {}

        if user_input is not None:
            try:
                await self._check_unique(user_input[CONF_NAME])

                # check input sensor exists
                status = self.hass.states.get(user_input[CONF_INPUT_SENSOR])
                if status is None:
                    raise SensorNotFound

                # check the operation
                if user_input[CONF_OPERATION] not in VALID_OPERATIONS:
                    raise OperationNotFound
                # check the interval
                if (
                    not (isinstance(user_input[CONF_INTERVAL], int))
                    or int(user_input[CONF_INTERVAL]) <= 0
                ):
                    raise IntervalNotValid
                self._name = user_input[CONF_NAME]

                return self.async_create_entry(title=self._name, data=user_input)

            except NotUnique:
                _LOGGER.error("Instance name is not unique.")
                self._errors["base"] = "name"
            except SensorNotFound:
                _LOGGER.error(
                    "Input sensor {} not found.".format(user_input[CONF_INPUT_SENSOR])
                )
                self._errors["base"] = "sensornotfound"
            except OperationNotFound:
                _LOGGER.error(
                    "Specified operation {} not valid.".format(
                        user_input[CONF_OPERATION]
                    ),
                )
                self._errors["base"] = "operationnotfound"
            except IntervalNotValid:
                _LOGGER.error(
                    "Specified interval {} not valid.".format(
                        user_input[CONF_INTERVAL]
                    ),
                )
                self._errors["base"] = "intervalnotvalid"

            return await self._show_config_form(user_input)
        return await self._show_config_form(user_input)

    async def _show_config_form(self, user_input):
        """Show the configuration form to edit info."""
        return self.async_show_form(
            step_id="user",
            data_schema=vol.Schema(
                {
                    vol.Required(CONF_NAME, default=NAME): str,
                    vol.Required(CONF_INPUT_SENSOR): str,
                    vol.Required(CONF_OPERATION): vol.In(VALID_OPERATIONS),
                    vol.Required(CONF_UNIT_OF_MEASUREMENT): str,
                    vol.Required(CONF_INTERVAL, default=DEFAULT_INTERVAL): int,
                }
            ),
            errors=self._errors,
        )

    async def _check_unique(self, thename):
        """Test if the specified name is not already claimed."""
        await self.async_set_unique_id(thename)
        self._abort_if_unique_id_configured()


class SensorNotFound(exceptions.HomeAssistantError):
    """Error to indicate a sensor is not found."""


class OperationNotFound(exceptions.HomeAssistantError):
    """Error to indicate the operation specified is not valid."""


class IntervalNotValid(exceptions.HomeAssistantError):
    """Error to indicate the interval specified is not valid."""


class NotUnique(exceptions.HomeAssistantError):
    """Error to indicate that the name is not unique."""

"""Sensor platform for Daily Sensor."""
import asyncio
import logging
from statistics import median, stdev, variance, StatisticsError

from homeassistant.core import callback, Event

# from homeassistant.helpers import entity_registry as er

from .const import (  # pylint: disable=unused-import
    DOMAIN,
    ICON,
    EVENT_RESET,
    EVENT_UPDATE,
    CONF_MAX,
    CONF_MIN,
    CONF_MEAN,
    CONF_MEDIAN,
    CONF_STDEV,
    CONF_VARIANCE,
    CONF_SUM,
    CONF_INPUT_SENSOR,
    CONF_OPERATION,
    CONF_INTERVAL,
    CONF_UNIT_OF_MEASUREMENT,
)
from .entity import DailySensorEntity

_LOGGER = logging.getLogger(__name__)


async def async_setup_entry(hass, entry, async_add_devices):
    """Set up the platform and add to HA."""
    coordinator = hass.data[DOMAIN][entry.entry_id]

    async_add_devices([DailySensor(hass, coordinator, entry)])


class DailySensor(DailySensorEntity):
    """DailySensor class."""

    def __init__(self, hass, coordinator, entity):
        """Init for DailySensor."""
        super(DailySensor, self).__init__(coordinator, entity)
        self._state = None
        self._values = []

    @asyncio.coroutine
    async def async_added_to_hass(self):
        """Complete the initialization."""
        await super().async_added_to_hass()
        # register this sensor in the coordinator
        self.coordinator.register_entity(self.name, self.entity_id)

        # listen to the update event and reset event
        event_to_listen = f"{self.coordinator.name}_{EVENT_RESET}"
        self.hass.bus.async_listen(
            event_to_listen,
            lambda event: self._handle_reset(  # pylint: disable=unnecessary-lambda
                event
            ),
        )
        event_to_listen_2 = f"{self.coordinator.name}_{EVENT_UPDATE}"
        self.hass.bus.async_listen(
            event_to_listen_2,
            lambda event: self._handle_update(  # pylint: disable=unnecessary-lambda
                event
            ),
        )

        state = await self.async_get_last_state()
        if state is not None and state.state != "unavailable":
            self._state = float(state.state)

    @callback
    def _handle_reset(self, event: Event):
        """Receive the reset event."""
        # reset the sensor
        self._state = None
        self._values = []
        self.hass.add_job(self.async_update_ha_state)

    @callback
    def _handle_update(self, event: Event):
        """Receive the update event."""
        # update the sensor
        input_state = self.hass.states.get(self.coordinator.input_sensor)
        try:
            if input_state is not None:
                if input_state.state is None:
                    the_val = self.convert_to_float(input_state)
                else:
                    the_val = self.convert_to_float(input_state.state)
                # apply the operation and update self._state
                if self.coordinator.operation == CONF_SUM:
                    if self._state is None:
                        self._state = the_val
                    else:
                        self._state = self._state + the_val
                elif self.coordinator.operation == CONF_MAX:
                    if self._state is None:
                        self._state = the_val
                    elif the_val > self._state:
                        self._state = the_val
                elif self.coordinator.operation == CONF_MIN:
                    if self._state is None:
                        self._state = the_val
                    elif the_val < self._state:
                        self._state = the_val
                elif self.coordinator.operation == CONF_MEAN:
                    self._values.append(the_val)
                    self._state = (sum(self._values) * 1.0) / len(self._values)
                elif self.coordinator.operation == CONF_MEDIAN:
                    self._values.append(the_val)
                    self._state = median(self._values)
                elif self.coordinator.operation == CONF_STDEV:
                    self._values.append(the_val)
                    self._state = stdev(self._values)
                elif self.coordinator.operation == CONF_VARIANCE:
                    self._values.append(the_val)
                    try:
                        self._state = variance(self._values)
                    except StatisticsError:
                        pass
                self.hass.add_job(self.async_update_ha_state)
        except ValueError:
            _LOGGER.error("unable to convert to float.")

    def convert_to_float(self, float_value):
        """Convert to Float."""
        try:
            return float(float_value)
        except ValueError:
            _LOGGER.error("unable to convert {} to float.".format(float_value))
            raise ValueError

    @property
    def name(self):
        """Return the name of the sensor."""
        return f"{self.coordinator.name}"

    @property
    def state(self):
        """Return the state of the sensor."""
        return self._state

    @property
    def unit_of_measurement(self):
        """Return the unit of measurement for the sensor."""
        return self.coordinator.unit_of_measurement

    @property
    def device_state_attributes(self):
        """Return the state attributes."""
        return {
            CONF_INPUT_SENSOR: self.coordinator.input_sensor,
            CONF_OPERATION: self.coordinator.operation,
            CONF_INTERVAL: self.coordinator.interval,
            CONF_UNIT_OF_MEASUREMENT: self.unit_of_measurement,
        }

    @property
    def icon(self):
        """Return the icon of the sensor."""
        return ICON

"""The Daily Sensor integration."""
import asyncio
from datetime import timedelta
import logging
import weakref

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ConfigEntryNotReady
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.helpers.event import async_track_time_change
from .const import (
    DOMAIN,
    PLATFORMS,
    STARTUP_MESSAGE,
    CONF_NAME,
    CONF_INPUT_SENSOR,
    CONF_OPERATION,
    CONF_INTERVAL,
    CONF_UNIT_OF_MEASUREMENT,
    EVENT_RESET,
    EVENT_UPDATE,
    SERVICE_RESET,
    SERVICE_UPDATE,
)

_LOGGER = logging.getLogger(__name__)


async def async_setup(hass: HomeAssistant, config: dict):
    """Set up this integration using YAML is not supported."""
    return True


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Set up this integration using UI."""
    if hass.data.get(DOMAIN) is None:
        hass.data.setdefault(DOMAIN, {})
        _LOGGER.info(STARTUP_MESSAGE)
    name = entry.data.get(CONF_NAME)
    input_sensor = entry.data.get(CONF_INPUT_SENSOR)
    operation = entry.data.get(CONF_OPERATION)
    interval = entry.data.get(CONF_INTERVAL)
    unit_of_measurement = entry.data.get(CONF_UNIT_OF_MEASUREMENT)

    # set up coordinator
    coordinator = DailySensorUpdateCoordinator(
        hass,
        name=name,
        input_sensor=input_sensor,
        operation=operation,
        interval=interval,
        unit_of_measurement=unit_of_measurement,
    )

    await coordinator.async_refresh()

    if not coordinator.last_update_success:
        raise ConfigEntryNotReady

    hass.data[DOMAIN][entry.entry_id] = coordinator

    for platform in PLATFORMS:
        coordinator.platforms.append(platform)
        hass.async_add_job(
            hass.config_entries.async_forward_entry_setup(entry, platform)
        )

    # add update listener if not already added.
    if weakref.ref(async_reload_entry) not in entry.update_listeners:
        entry.add_update_listener(async_reload_entry)

    # register services
    hass.services.async_register(
        DOMAIN, f"{name}_{SERVICE_RESET}", coordinator.handle_reset,
    )
    hass.services.async_register(
        DOMAIN, f"{name}_{SERVICE_UPDATE}", coordinator.handle_update,
    )
    return True


async def async_reload_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Reload config entry."""
    coordinator = hass.data[DOMAIN][entry.entry_id]
    if coordinator.entry_setup_completed:
        await async_unload_entry(hass, entry)
    await async_setup_entry(hass, entry)


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry):
    """Handle removal of an entry."""
    coordinator = hass.data[DOMAIN][entry.entry_id]
    unloaded = all(
        await asyncio.gather(
            *[
                hass.config_entries.async_forward_entry_unload(entry, platform)
                for platform in PLATFORMS
                if platform in coordinator.platforms
            ]
        )
    )
    if unloaded:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unloaded


class DailySensorUpdateCoordinator(DataUpdateCoordinator):
    """Class to store settings."""

    def __init__(
        self, hass, name, input_sensor, operation, interval, unit_of_measurement
    ):
        """Initialize."""
        self.name = name
        self.input_sensor = input_sensor
        self.operation = operation
        self.interval = int(interval)
        self.unit_of_measurement = unit_of_measurement
        self.hass = hass
        self.entities = {}
        self.platforms = []
        self.entry_setup_completed = False

        SCAN_INTERVAL = timedelta(minutes=self.interval)
        super().__init__(hass, _LOGGER, name=name, update_interval=SCAN_INTERVAL)

        # reset happens at midnight
        async_track_time_change(
            hass, self._async_reset, hour=0, minute=0, second=0,
        )
        self.entry_setup_completed = True

    def register_entity(self, thetype, entity):
        """Register an entity."""
        self.entities[thetype] = entity

    def fire_event(self, event):
        """Fire an event."""
        event_to_fire = f"{self.name}_{event}"
        self.hass.bus.fire(event_to_fire)

    def handle_reset(self, call):
        """Hande the reset service call."""
        self.fire_event(EVENT_RESET)

    def handle_update(self, call):
        """Handle the update service call."""
        self.fire_event(EVENT_UPDATE)

    async def _async_reset(self, *args):
        _LOGGER.info("Resetting daily sensor {}!".format(self.name))
        self.fire_event(EVENT_RESET)

    async def _async_update_data(self):
        """Update data."""
        _LOGGER.info("Updating Daily Sensor {}".format(self.name))
        # fire an event so the sensor can update itself.
        self.fire_event(EVENT_UPDATE)


"""Constants for the Daily Sensor integration."""

DOMAIN = "daily"
NAME = "Daily Sensor"
DOMAIN_DATA = f"{DOMAIN}_data"
VERSION = "0.3"

ISSUE_URL = "https://github.com/jeroenterheerdt/HADailySensor/issues"

# Icons
ICON = "mdi:timetable"

# Platforms
SENSOR = "sensor"
PLATFORMS = [SENSOR]

# Config
CONF_INPUT_SENSOR = "sensor"
CONF_OPERATION = "operation"
CONF_NAME = "name"
CONF_INTERVAL = "interval"
CONF_UNIT_OF_MEASUREMENT = "unit_of_measurement"

# Operations
CONF_MAX = "max"
CONF_MIN = "min"
CONF_MEAN = "mean"
CONF_MEDIAN = "median"
CONF_STDEV = "stdev"
CONF_VARIANCE = "variance"
CONF_SUM = "sum"
VALID_OPERATIONS = [
    CONF_MAX,
    CONF_MIN,
    CONF_MEAN,
    CONF_MEDIAN,
    CONF_STDEV,
    CONF_VARIANCE,
    CONF_SUM,
]

# Defaults
DEFAULT_INTERVAL = 30  # minutes

# Services
SERVICE_RESET = "reset"
SERVICE_UPDATE = "update"

# Events
EVENT_RESET = "reset"
EVENT_UPDATE = "update"

STARTUP_MESSAGE = f"""
-------------------------------------------------------------------
{NAME}
Version: {VERSION}
If you have any issues with this you need to open an issue here:
{ISSUE_URL}
-------------------------------------------------------------------
"""

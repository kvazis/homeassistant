"""The broadlink component."""
import asyncio
from base64 import b64decode, b64encode
import logging
import socket

from datetime import timedelta
import voluptuous as vol

from homeassistant.const import CONF_HOST
import homeassistant.helpers.config_validation as cv
from homeassistant.util.dt import utcnow

from .const import CONF_PACKET, DOMAIN

_LOGGER = logging.getLogger(__name__)

DEFAULT_RETRY = 3


def data_packet(value):
    """Decode a data packet given for broadlink."""
    value = cv.string(value)
    extra = len(value) % 4
    if extra > 0:
        value = value + ('=' * (4 - extra))
    return b64decode(value)

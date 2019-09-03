import asyncio
import logging
from typing import Callable, Awaitable, Dict

from .sonoffdevice import SonoffDevice
from .client import SonoffLANModeClient


class SonoffSwitch(SonoffDevice):
    """Representation of a Sonoff Smart Switch/Plug/Wall Switch in LAN Mode.

    Usage example when used as library:
    p = SonoffSwitch("192.168.1.105")
    # print the device ID
    print(p.device_id)
    # change state of plug
    p.state = "ON"
    p.state = "OFF"
    # query and print current state of plug
    print(p.state)

    Errors reported by the device are raised as Exceptions,
    and should be handled by the user of the library.
    """
    # switch states
    SWITCH_STATE_ON = 'ON'
    SWITCH_STATE_OFF = 'OFF'
    SWITCH_STATE_UNKNOWN = 'UNKNOWN'


    def __init__(self,
                 host: str,
                 callback_after_update: Callable[
                     [SonoffDevice], Awaitable[None]] = None,
                 shared_state: Dict = None,
                 inching_seconds: int = None,
                 logger=None,
                 loop=None,
                 ping_interval=SonoffLANModeClient.DEFAULT_PING_INTERVAL,
                 timeout=SonoffLANModeClient.DEFAULT_TIMEOUT,
                 context: str = None,
                 device_id: str = None,
                 api_key: str = None) -> None:

        self.inching_seconds = inching_seconds
        self.parent_callback_after_update = callback_after_update

        if logger is None:
            self.logger = logging.getLogger(__name__)
        else:
            self.logger = logger

        SonoffDevice.__init__(
            self,
            host=host,
            callback_after_update=self.pre_callback_after_update,
            logger=self.logger,
            loop=loop,
            shared_state=shared_state,
            ping_interval=ping_interval,
            timeout=timeout,
            context=context,
            device_id=device_id,
            api_key=api_key
        )

    @property
    def state(self) -> str:
        """
        Retrieve the switch state

        :returns: one of
                  SWITCH_STATE_ON
                  SWITCH_STATE_OFF
                  SWITCH_STATE_UNKNOWN
        :rtype: str
        """
        try:
            state = self.params['switch']
        except:
            state = SonoffSwitch.SWITCH_STATE_UNKNOWN
        
        if state == "off":
            return SonoffSwitch.SWITCH_STATE_OFF
        elif state == "on":
            return SonoffSwitch.SWITCH_STATE_ON
        else:
            self.logger.debug("Unknown state %s returned.", state)
            return SonoffSwitch.SWITCH_STATE_UNKNOWN

    @state.setter
    async def state(self, value: str):
        """
        Set the new switch state

        :param value: one of
                    SWITCH_STATE_ON
                    SWITCH_STATE_OFF
        :raises ValueError: on invalid state

        """
        if not isinstance(value, str):
            raise ValueError("State must be str, not of %s.", type(value))
        elif value.upper() == SonoffSwitch.SWITCH_STATE_ON:
            await self.turn_on()
        elif value.upper() == SonoffSwitch.SWITCH_STATE_OFF:
            await self.turn_off()
        else:
            raise ValueError("State %s is not valid.", value)

    @property
    def is_on(self) -> bool:
        """
        Returns whether device is on.
        :return: True if device is on, False otherwise
        """
        if 'switch' in self.params:
            return self.params['switch'] == "on"

        return False

    async def turn_on(self):
        """
        Turn the switch on.
        """
        self.logger.debug("Switch turn_on called.")
        self.update_params({"switch": "on"})

    async def turn_off(self):
        """
        Turn the switch off.
        """
        self.logger.debug("Switch turn_off called.")
        self.update_params({"switch": "off"})

    async def shutdown_inching(self):
        self.logger.debug("shutdown_inching running")
        await self.turn_off()
        await asyncio.sleep(1)

        if self.parent_callback_after_update is not None:
            await self.parent_callback_after_update(self)
        self.shutdown_event_loop()

    def callback_to_turn_off_inching(self):
        self.logger.debug("callback_to_turn_off_inching running")
        asyncio.ensure_future(self.shutdown_inching())

    async def pre_callback_after_update(self, _):
        """
        Handle update callback to implement inching functionality before
        calling the parent callback
        """
        self.logger.debug("Switch update pre-callback filter running")

        if self.basic_info is None:
            self.logger.debug(
                "Basic info still none, waiting for init message")
            return

        if self.inching_seconds is not None:
            self.logger.debug("Inching switch pre-callback logic running")

            if self.is_off:
                self.logger.debug(
                    "Inching switch activated, waiting %ss before "
                    "turning OFF again" % self.inching_seconds)

                inching_task = self.loop.call_later(
                    self.inching_seconds,
                    self.callback_to_turn_off_inching
                )

                self.tasks.append(inching_task)        
                await self.turn_on()
        else:
            self.logger.debug("Not inching switch, calling parent callback")

            if self.parent_callback_after_update is not None:
                await self.parent_callback_after_update(self)

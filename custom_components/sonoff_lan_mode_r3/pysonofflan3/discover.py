import ipaddress
import logging
import socket
import threading
from itertools import chain
from typing import Dict


class Discover:
    SONOFF_PORT = 8081

    @staticmethod
    async def discover(logger=None) -> Dict[str, str]:
        """
        Attempts websocket connection on port 8081 to all IP addresses on
        common home IP subnets: 192.168.0.X and 192.168.1.X, in the hope of
        detecting  available supported devices in the local network.

        :rtype: dict
        :return: Array of devices {"ip": "device_id"}
        """
        if logger is None:
            logger = logging.getLogger(__name__)

        logger.debug("Attempting connection to all IPs on local network.")
        devices = {}
        threads = []

        try:
            local_ip_ranges = chain(
                ipaddress.IPv4Network('127.0.0.1/32'),
                ipaddress.IPv4Network('192.168.0.0/24'),
                ipaddress.IPv4Network('192.168.1.0/24')
            )

            # Spawn thread per IP address to scan
            for ip in local_ip_ranges:
                t = threading.Thread(target=Discover.probe_ip,
                                     args=(logger, ip, devices))
                threads.append(t)

            # Start all threads
            for thread in threads:
                thread.start()

            # Lock the main thread until all threads complete
            for thread in threads:
                thread.join()

        except Exception as ex:
            logger.error("Caught Exception: %s" % ex, exc_info=False)

        return devices

    @staticmethod
    def probe_ip(logger, ip, devices):
        """
        Attempt connection to IP address on specified port, adding this IP
        to the devices dict if the connection was successful

        :param logger: Logger instance to output debug messages on
        :param ip: IP address to test
        :param devices: Dict to insert IP into if connectable
        """
        logger.debug(
            "Attempting connection to IP: %s on port %s" % (
                ip, Discover.SONOFF_PORT)
        )
        tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        tcp_sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        tcp_sock.settimeout(0.5)
        result = tcp_sock.connect_ex((str(ip), Discover.SONOFF_PORT))
        if result == 0:
            logger.debug(
                "Found open port %s at local IP: %s" % (
                    Discover.SONOFF_PORT,
                    ip
                )
            )
            devices[ip] = ip

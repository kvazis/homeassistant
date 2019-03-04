#!/bin/bash -x
echo -ne '{"id": 1, "method":"bg_set_power", "params":["off", "smooth", 500]}\r\n' | nc -w1 192.168.0.148 55443
echo -ne '{"id": 1, "method":"bg_set_power", "params":["off", "smooth", 500]}\r\n' | nc -w1 192.168.0.166 55443
echo -ne '{"id": 1, "method":"set_power", "params":["off", "smooth", 500]}\r\n' | nc -w1 192.168.0.212 55443
echo -ne '{"id": 1, "method":"set_power", "params":["off", "smooth", 500]}\r\n' | nc -w1 192.168.0.214 55443

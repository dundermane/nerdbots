import smbus
import time
bus = smbus.SMBus(1)
address = hex(0x40)

prescale = hex( round( ( 25000000 / ( 4096 * 50 ) ) - 1 )
bus.write_byte_data(address, hex(254), prescale)


def setpwm( pos , value ):
    if pos in range(0,15):
        onL = hex(0x00)
        onH = hex(0x00)
        offL = hex(value & 0x00FF)
        offH = hex(value >> 2)
        bus.write_byte_data(address, hex(6 + 4 * pos), onL)
        bus.write_byte_data(address, hex(7 + 4 * pos), onH) 
        bus.write_byte_data(address, hex(8 + 4 * pos), offL) 
        bus.write_byte_data(address, hex(9 + 4 * pos), offH) 
 
counter = 0
ascending = 1

while True:
    setpwm(0, counter)
    if ascending and counter >= 4095:
        ascending = 0
        counter -= 1
    else if ascending:
        counter +=1
    else if !ascending and <= 0:
        ascending = 1
        counter += 1
    else if !ascending:
        counter -= 1
    
    time.sleep(.01)

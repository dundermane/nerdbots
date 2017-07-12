import smbus
import time
bus = smbus.SMBus(1)
address = 0x40

prescale = ( 25000000 / ( 4096 * 50 ) ) - 1 
print prescale
bus.write_byte_data(address, 254, prescale)


def setpwm( pos , value ):
    if pos in range(0,15):
        onL = 0x00
        onH = 0x00
        offL = value & 0x00FF
        offH = value >> 2
        bus.write_byte_data(address, 6 + (4 * pos), onL)
        bus.write_byte_data(address, 7 + (4 * pos), onH) 
        bus.write_byte_data(address, 8 + (4 * pos), offL) 
        bus.write_byte_data(address, 9 + (4 * pos), offH) 
 
counter = 0
ascending = 1

while True:
    setpwm(1, counter)
    print "set pwm at {0}".format(counter)
    if ascending and counter >= 4095:
        ascending = 0
        counter -= 1
    elif ascending:
        counter +=1
    elif not ascending and counter <= 0:
        ascending = 1
        counter += 1
    elif not ascending:
        counter -= 1
    
    time.sleep(.01)

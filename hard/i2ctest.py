import smbus
import time
bus = smbus.SMBus(1)
address = 0x40

def init():
    sleepbyte = 0b00010000
    bus.write_byte_data(address, 0, sleepbyte)
    time.sleep(.5)

    prescale = ( 25000000 / ( 4096 * 50 ) ) - 1
    bus.write_byte_data(address, 0xFE, prescale)

    modebyte = bus.read_byte_data(address, 0)
    if (modebyte & 0b10000000) == 0b10000000:
        wakebyte = 0b00000000
        bus.write_byte_data(address, 0, wakebyte)
        time.sleep(.5)

        resetbyte = 0b10000000
        bus.write_byte_data(address, 0, resetbyte)
    else:
	print "Startup Failed"
        init()


def setpwm( pos , value ):
    if pos in range(0,15):
        onL = 0x00
        onH = 0x00
        offL = value & 0b11111111
        offH = value >> 8
        bus.write_byte_data(address, 6 + (4 * pos) , onL)
        bus.write_byte_data(address, 7 + (4 * pos) , onH) 
        bus.write_byte_data(address, 8 + (4 * pos) , offL) 
        bus.write_byte_data(address, 9 + (4 * pos) , offH) 
        lsb = bus.read_byte_data(address, 8)
	msb = bus.read_byte_data(address, 9)
	print (msb << 8) + lsb        

counter = 0
ascending = 1
init()

while True:
    setpwm(0, counter)

    if ascending and counter >= 500:
        ascending = 0
        counter -= 1
    elif ascending:
        counter +=1
    elif not ascending and counter <= 0:
        ascending = 1
        counter += 1
    elif not ascending:
        counter -= 1
    
    time.sleep(0.005)

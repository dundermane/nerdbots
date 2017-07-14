import smbus
import time

bus = smbus.SMBus(1)
address = 0x40
frequency = 50

def init():
    sleepbyte = 0b00010000
    bus.write_byte_data(address, 0, sleepbyte)
    time.sleep(.5)

    prescale = ( 25000000 / ( 4096 * frequency ) ) - 1
    bus.write_byte_data(address, 0xFE , prescale)

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

def todiv(servo):
    if (servo.curangle >= servo.minangle and servo.curangle <= servo.maxangle):
        refresh = 1.000000000 / frequency
        timediv = refresh / 4096
        angletime = (servo.maxtime - servo.mintime) / (servo.maxangle - servo.minangle) * (servo.curangle - servo.minangle) + servo.mintime
        bitvalue = int(round(angletime / timediv) - 1)
        return bitvalue
    

def setpwm(servo):
    if servo.address in range(0,15):
        onL = 0x00
        onH = 0x00
        offL = servo.bit & 0b11111111
        offH = servo.bit >> 8
        bus.write_byte_data(address, 6 + (4 * servo.address) , onL)
        bus.write_byte_data(address, 7 + (4 * servo.address) , onH) 
        bus.write_byte_data(address, 8 + (4 * servo.address) , offL) 
        bus.write_byte_data(address, 9 + (4 * servo.address) , offH) 
  
class servo:
    def __init__(self, jointaddress, minangle, maxangle, mintime, maxtime):
        self.address = jointaddress
        self.minangle = minangle
        self.maxangle = maxangle
        self.mintime = mintime
        self.maxtime = maxtime
        self.curangle = 90
        self.bit = todiv(self)
        setpwm(self) 

    def update(self, angle):
        self.curangle = angle
        self.bit = todiv(self)
        setpwm(self)      

baseservo = servo(0, 10, 170, 0.00097656, 0.00244141)
counter = 90
ascending = 1
init()

while True:
    baseservo.update(counter)

    if ascending and counter >= 170:
        ascending = 0
        time.sleep(0.5)
    elif ascending:
        counter +=5
    elif not ascending and counter <=10:
        ascending = 1
        time.sleep(0.5)
    elif not ascending:
        counter -= 5
    
    

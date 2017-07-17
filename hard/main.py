import i2clayer as i2c
import time

i2c.init()

baseservo = i2c.servo(1, 10, 170, 0.00097565, 0.00244141)
elbowservo = i2c.servo(0, 10, 170, 0.00097565, 0.00244141)
armservo = i2c.servo(2, 10, 170, 0.00097565, 0.00244141)
extraservo = i2c.servo(3, 10, 170, 0.00097565, 0.00244141)

time.sleep(1)

angle0 = 10
ascending = 1

while 1 == 1:
    baseservo.update(angle0)
    elbowservo.update(angle0)
    armservo.update(angle0)
    extraservo.update(angle0)

    if angle0 == 90 and ascending:
        angle0 = 170
    elif angle0 == 170:
        angle0 = 90
        ascending = 0
    elif angle0 == 90 and not ascending:
        angle0 = 10
    elif angle0 == 10:
        angle0 = 90
        ascending = 1

    time.sleep(2)

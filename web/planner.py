
def get_last_movement_data( time ):

    from dblayer import couch
    c = couch()
    print (time)

    fake = [ { 'time': 120012, 'q0': 201 , 'q1':130 , 'q2':100 , 'q3':80 , 'q4':200 , 'q5': 120},
             { 'time': 120012, 'q0': 203 , 'q1':130 , 'q2':100 , 'q3':76 , 'q4':200 , 'q5': 125},
             { 'time': 120012, 'q0': 205 , 'q1':130 , 'q2':100 , 'q3':72 , 'q4':200 , 'q5': 129}
    ]

    return fake


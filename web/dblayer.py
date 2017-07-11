

class couch(object):
    def __init__(self):

        from couchdb.client import Server

        couch = Server('http://localhost:5984')
        print (couch)
        try:
            self.db = couch.create('run-layer')
        except:
            self.db = couch['run-layer']

        print (self.db)

 



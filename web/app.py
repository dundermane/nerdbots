#!/usr/bin/env python

from flask import Flask, render_template, url_for, request, jsonify
from planner import *

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/ldata', methods=['GET'])
def ldata():
    return jsonify(get_last_movement_data(23))

@app.route('/p5box')
def p5box():
    return render_template('p5sandbox.html')

if __name__=='__main__':

    import os, sys, datetime
    ddate = datetime.datetime.now()
    tdate = ddate.isoformat().replace(".","").replace("-","").replace(":","")
    thisDir = os.path.dirname(os.path.realpath(__file__))
    f = open("{0}/logs/{1}".format(thisDir,tdate), 'w')
    sys.stdout = f
    sys.stderr = f
    
    app.run(host="0.0.0.0")

    f.close()

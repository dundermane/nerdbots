from flask import Flask, render_template, url_for, request, jsonify
from planner import *
import datetime

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

    import sys
    tdate = datetime.date.today()
    f = open("logs/{0}".format(tdate), 'w')
    sys.stdout = f
    sys.stderr = f
    
    app.run(host="0.0.0.0")

    f.close()

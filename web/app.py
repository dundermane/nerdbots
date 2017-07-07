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
    app.run()

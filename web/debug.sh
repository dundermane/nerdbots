#/bin/bash

lessc static/css/style.less > static/css/style.css

export FLASK_APP=app.py
export FLASK_DEBUG=1
python app.py

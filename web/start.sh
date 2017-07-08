#/bin/bash

pkill -9 -f "python app.py"
python app.py &

exit

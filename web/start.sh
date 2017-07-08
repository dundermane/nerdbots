#/bin/bash

pkill -9 -f "python app.py"
python app.py &
echo hello

exit 1

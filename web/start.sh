#/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
wall $DIR
pkill -9 -f "python $DIR/app.py"
python $DIR/app.py &

exit 1

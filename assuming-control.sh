#!/bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd $DIR
target="./src/program.py"
path="/usr/local/bin/python3.6 src/program.py $(realpath $target)"
echo $path

if [ "$1" = "start" ]
then
    logFilePath="log/$(date +"%Y-%m-%d").log"
    echo "LauncherStarting... $(date)" >>$logFilePath
	nohup $path >>$logFilePath 2>&1 &
fi

if [ "$1" == "stop" ]
then
    pkill -f -x "$path"
fi
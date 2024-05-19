#!/bin/sh

if [ ! -d /app/data ]; then
    mkdir -p /app/data
fi

if [ ! -e /app/data/points.json ]; then
    cp /app/points.json.template /app/data/points.json
fi

cd /app
export POINTS_FILE_PATH=/app/data/
nodejs main.js

#!/bin/bash

SERVICE_NAME="nexus-api"
LOG_FILE="/var/log/nexus-health.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

echo "Checking if $SERVICE_NAME is running..."
if ! systemctl is-active --quiet $SERVICE_NAME; then
    echo "$TIMESTAMP - $SERVICE_NAME was down. Restarting..." | sudo tee -a $LOG_FILE
    sudo systemctl restart $SERVICE_NAME
else
    echo "$TIMESTAMP - $SERVICE_NAME is running fine." | sudo tee -a $LOG_FILE
fi

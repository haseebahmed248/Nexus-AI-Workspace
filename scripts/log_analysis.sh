#!/bin/bash

LOG_FILE="/var/log/nginx/access.log"

echo "Analyzing log file: $LOG_FILE"
echo "Top 3 IP addresses with the most requests:"

awk '{print $1}' "$LOG_FILE" | sort | uniq -c | sort -nr | head -3

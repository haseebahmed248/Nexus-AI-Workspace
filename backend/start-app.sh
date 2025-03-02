#!/bin/bash
cd "$(dirname "$0")"
export NODE_ENV=development
# Uncomment and modify these if your app needs environment variables
# export DATABASE_URL="your_database_url"
# export PORT=3000

# Run the app with error handling
node dist/index.js || echo "Application exited with error code $?"

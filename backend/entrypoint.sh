#!/bin/bash

echo "Running migrations..."
npm run db:migrate

echo "Starting Backend Server..."
npm run dev
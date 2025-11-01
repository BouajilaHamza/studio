#!/bin/bash

# Start the tailwindcss watcher in the background
npm run build:css -- --watch &

# Start the uvicorn server
# The --reload flag will watch for Python file changes
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

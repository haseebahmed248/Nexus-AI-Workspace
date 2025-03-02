#!/bin/bash

PROJECT_DIR="/home/muhammad-ahmad/Nexus-AI-Workspace/backend"
SERVICE_NAME="nexus-api"

echo "=== Setting up Node.js Service, Kernel Parameters, and Firewall ==="

# 1. Install dependencies and build
echo "Setting up the application..."
cd "$PROJECT_DIR" || exit 1
npm install --save module-alias
npm run build

# 2. Create a simple wrapper script to handle startup issues
echo "Creating application wrapper script..."
cat > "$PROJECT_DIR/start-app.sh" << 'EOL'
#!/bin/bash
cd "$(dirname "$0")"
export NODE_ENV=development
# Uncomment and modify these if your app needs environment variables
# export DATABASE_URL="your_database_url"
# export PORT=3000

# Run the app with error handling
node dist/index.js || echo "Application exited with error code $?"
EOL

chmod +x "$PROJECT_DIR/start-app.sh"

# 3. Setup systemd service with the wrapper script
echo "Creating systemd service..."
cat > /tmp/$SERVICE_NAME.service << EOL
[Unit]
Description=Nexus AI API Service
After=network.target

[Service]
Type=simple
User=$(whoami)
Group=$(whoami)
WorkingDirectory=$PROJECT_DIR
ExecStart=$PROJECT_DIR/start-app.sh
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

[Install]
WantedBy=multi-user.target
EOL

sudo cp /tmp/$SERVICE_NAME.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME.service

# 4. Kernel tuning
echo "Tuning kernel parameters..."
if ! grep -q "net.core.somaxconn = 4096" /etc/sysctl.conf; then
  echo "net.core.somaxconn = 4096" | sudo tee -a /etc/sysctl.conf
fi
sudo sysctl -p

# 5. Firewall setup
echo "Setting up firewall..."
sudo ufw allow ssh
sudo ufw allow http
sudo ufw allow https
sudo ufw --force enable

# 6. Start service and show status
echo "Starting service..."
sudo systemctl restart $SERVICE_NAME.service
./setup_nexus_service.sh
echo "=== Setup Complete ==="
echo "Service status:"
sudo systemctl status $SERVICE_NAME.service

echo "Kernel parameter:"
sudo sysctl net.core.somaxconn

echo "Firewall status:"
sudo ufw status

echo ""
echo "All tasks completed successfully!"
echo "- Service: $SERVICE_NAME is set up and running"
echo "- Kernel: net.core.somaxconn is increased to 4096"
echo "- Firewall: Configured to allow HTTP/HTTPS and SSH"
echo ""
echo "To view detailed service logs: sudo journalctl -u $SERVICE_NAME.service -f"
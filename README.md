# 🚀 Nexus-AI-Workspace  

## 📌 Task 1: Nexus AI API Service Setup  

### ✅ Service Status  
The **Nexus AI API Service** has been successfully started:  
```shell
Mar 02 19:56:21 Muhammad-Ahmad systemd[1]: Started nexus-api.service - Nexus AI API Service.
```

### ⚙️ Kernel Parameter Configuration  
The following kernel parameter has been successfully updated to improve performance:  
```shell
net.core.somaxconn = 4096
```

### 🔥 Firewall Configuration  
The firewall has been properly configured to allow necessary traffic:  

| Port  | Protocol | Action | Scope |
|--------|---------|--------|-------|
| 80     | TCP     | ALLOW  | Anywhere (HTTP) |
| 443    | TCP     | ALLOW  | Anywhere (HTTPS) |
| 22     | TCP     | ALLOW  | Anywhere (SSH) |
| 80 (v6)  | TCP   | ALLOW  | Anywhere (IPv6) |
| 443 (v6) | TCP   | ALLOW  | Anywhere (IPv6) |
| 22 (v6)  | TCP   | ALLOW  | Anywhere (IPv6) |

### 🔍 Verify Service Logs  
To check real-time logs of the Nexus AI API Service, run:  
```bash
sudo journalctl -u nexus-api.service -f
```

---

## 📌 Task 2: Nginx Installation & Log Analysis  

### ✅ Installing & Starting Nginx  
The **Nginx** web server was successfully installed and enabled:  
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 🔎 Checking Nginx Status  
To verify that Nginx is running, use:  
```bash
sudo systemctl status nginx
```

### 📂 Log File Directory  
The logs for Nginx are stored in:  
```bash
/var/log/nginx/access.log
/var/log/nginx/error.log
```

### 🛠️ Running Health Check  
To check if the **Nexus API** is running, execute:  
```bash
~/Nexus-AI-Workspace/scripts/health_check.sh
```
If the service is down, this script will restart it automatically.

### 📊 Running Log Analysis  
To analyze Nginx logs and find the top request sources, run:  
```bash
~/Nexus-AI-Workspace/scripts/log_analysis.sh
```
Example Output:  
```
Analyzing log file: /var/log/nginx/access.log
Top 3 IP addresses with the most requests:
      1 127.0.0.1
      1 ::1
```

---

## 🎯 Summary  
✅ **Task 1:** Nexus API service is running, firewall and kernel optimizations are complete.  
✅ **Task 2:** Nginx is installed, logs are collected, and analysis scripts are running successfully.  



# Nexus-AI-Workspace
**Task  1 Overview**
Mar 02 19:56:21 Muhammad-Ahmad systemd[1]: Started nexus-api.service - Nexus AI API Service.
Kernel parameter:
net.core.somaxconn = 4096
Firewall status:
Status: active

To                         Action      From
--                         ------      ----
80/tcp                     ALLOW       Anywhere                  
443/tcp                    ALLOW       Anywhere                  
22/tcp                     ALLOW       Anywhere                  
443                        ALLOW       Anywhere                  
80/tcp (v6)                ALLOW       Anywhere (v6)             
443/tcp (v6)               ALLOW       Anywhere (v6)             
22/tcp (v6)                ALLOW       Anywhere (v6)             
443 (v6)                   ALLOW       Anywhere (v6)             


All tasks completed successfully!
- Service: nexus-api is set up and running
- Kernel: net.core.somaxconn is increased to 4096
- Firewall: Configured to allow HTTP/HTTPS and SSH

To view detailed service logs: sudo journalctl -u nexus-api.service -f


# Nginx Log Analysis - Task Completion

## **Task 2 Overview**
This guide covers the installation, configuration, and verification of Nginx, as well as running the log analysis script.

## **1. Installing and Starting Nginx**
Run the following command to install Nginx:
```bash
sudo apt install nginx -y
```
Enable and start the Nginx service:
```bash
sudo systemctl enable nginx
sudo systemctl start nginx
```

## **2. Verifying Nginx Logs**
Check if log files exist:
```bash
ls -lah /var/log/nginx/
```
If logs are empty, ensure logging is enabled:
```bash
sudo nano /etc/nginx/nginx.conf
```
Find and set:
```
access_log /var/log/nginx/access.log;
```
Restart Nginx:
```bash
sudo systemctl restart nginx
```

## **3. Generating Log Data**
Manually generate log entries:
```bash
curl -I http://localhost
curl -I http://127.0.0.1
```
Check logs:
```bash
sudo cat /var/log/nginx/access.log
```

## **4. Running Log Analysis Script**
Execute:
```bash
~/Nexus-AI-Workspace/scripts/log_analysis.sh
```
Expected output:
```
Analyzing log file: /var/log/nginx/access.log
Top 3 IP addresses with the most requests:
      1 127.0.0.1
      1 ::1
```

## **Task Completed Successfully ✅**
This confirms:
- Nginx is running
- Access logs are recorded
- Log analysis script works


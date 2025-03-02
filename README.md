# Nexus-AI-Workspace
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
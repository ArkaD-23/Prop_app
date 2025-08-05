#!/bin/sh

# Wait for backend/frontend to be ready
sleep 10

# Start Nginx in the background
nginx &

# Register and get the SSL cert using certbot
certbot --nginx --non-interactive --agree-tos --email raj2003dhar@gmail.com \
    -d propapp.duckdns.org

# Reload Nginx with the new certs
nginx -s reload

# Keep container running
tail -f /dev/null

FROM nginx:alpine

RUN apk add --no-cache certbot certbot-nginx bash curl

COPY default.conf /etc/nginx/conf.d/default.conf
COPY ssl-setup.sh /ssl-setup.sh

ENTRYPOINT ["/bin/sh", "/ssl-setup.sh"]

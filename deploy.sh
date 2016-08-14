#!/bin/sh

docker rm -f mob-cpanel

docker run  \
  --name mob-cpanel \
  --restart=always \
  -v `pwd`/dist:/usr/share/nginx/html:ro \
  -p 4000:80 \
  -d \
  nginx@stable

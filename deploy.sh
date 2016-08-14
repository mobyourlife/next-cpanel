#!/bin/sh

docker rm -f mob-cpanel

docker rmi -f mob-cpanel

docker build -t mob-cpanel .

docker run  \
  --name mob-cpanel \
  --restart=always \
  -v `pwd`/dist:/usr/share/nginx/html:ro \
  -p 4000:80 \
  -d \
  nginx@stable

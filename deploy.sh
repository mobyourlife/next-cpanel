#!/bin/sh

REPO_HASH=$(git rev-parse HEAD)
REPO_SHORT=${REPO_HASH:0:7}
IMG_NAME=mob-cpanel
IMG_VERSION=$IMG_NAME-$REPO_SHORT

docker build -t $IMG_VERSION .

docker ps -a | grep $IMG_NAME | awk '{print $1}' | xargs docker rm -f
> /dev/null 2>&1

docker run  \
  --name $IMG_VERSION \
  --restart=always \
  -p 4000:80 \
  -d \
  $IMG_VERSION

docker ps -a | grep $IMG_NAME | grep -v $IMG_VERSION | awk '{print $1}' | xargs docker rmi -f
> /dev/null 2>&1

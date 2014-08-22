#!/bin/sh

NAME=$1
IMAGE_PATH="./images/owncloud-apache"
IMAGE_NAME="oc-apache"

if [ $(docker images | grep $IMAGE_NAME -c ) -ne 0 ]
then
	echo "Image exists"
else
	echo "Building image"
	docker build -t $IMAGE_NAME $IMAGE_PATH
fi

CONTAINER_COUNT=$(docker ps -a | grep -c $IMAGE_NAME)

if [ $(docker ps -a | grep -c $NAME) -ne 0 ]
then
	echo "Name exists already"
	exit 1
fi

PORT=$((8000 + $CONTAINER_COUNT))

docker run -dp $PORT:80 -h $NAME --name=$NAME oc-apache /sbin/my_init --enable-insecure-key
IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $NAME) 

echo "Started $NAME on port: $PORT"

if [ ! -f ./insecure_key ]
then
	echo "Downloading insecure_key file for ssh connection"
	curl -o insecure_key -fSL https://github.com/phusion/baseimage-docker/raw/master/image/insecure_key
	chmod 600 insecure_key
fi

sleep 3
scp -i insecure_key ./autoconfig.php root@$IP:/var/www/owncloud/config/autoconfig.php

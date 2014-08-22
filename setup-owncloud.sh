#!/bin/sh

if [ "$#" -eq 0 ] 
then 
  echo "Please specify a name of the installation"
  echo "./setup-owncloud [-i] name"
  echo
  echo "-i  auto install with default config"
  exit
fi
if [ "$#" -eq 1 ]
then 
  INSTALL=""
  NAME=$1
  
fi
if [ "$#" -eq 2 ] 
then
  INSTALL=$1
  NAME=$2
fi

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

echo "Generating ownCloud instance $NAME on port: $PORT"

if [ ! -f configs/insecure_key ]
then
	echo "Downloading insecure_key file for ssh connection"
	curl -o configs/insecure_key -fSL https://github.com/phusion/baseimage-docker/raw/master/image/insecure_key
	chmod 600 configs/insecure_key
fi

if [ $INSTALL = "-i" ]
then
  echo "Configuring ownCloud"
  while ! scp -oStrictHostKeyChecking=no -i configs/insecure_key configs/autoconfig.php root@$IP:/var/www/owncloud/config/autoconfig.php > /dev/null 2>&1
  do
    sleep 1
  done

  echo "Installing ..."
  curl --silent 127.0.0.1:$PORT > /dev/null
fi

echo "Done"
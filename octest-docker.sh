#!/bin/bash

BASE_PATH=$(dirname $0)
cd $BASE_PATH

TESTS=$PWD/tests
IMAGE_PATH=$PWD/images/owncloud-apache
IMAGE_NAME="oc-apache"
NAME="oc-test"

#Get insecure key if not available
if [ ! -f configs/insecure_key ]; then
	echo "Downloading insecure_key file for ssh connection"
	curl -o configs/insecure_key -fSL https://github.com/phusion/baseimage-docker/raw/master/image/insecure_key
	chmod 600 configs/insecure_key
fi

if [ $(docker images | grep $IMAGE_NAME -c ) -ne 0 ]
then
	echo "Image exists"
else
	echo "Building image"
	docker build -t $IMAGE_NAME $IMAGE_PATH
fi

if [ $(docker ps -a | grep -c $NAME) -ne 0 ]
then
  docker stop $NAME
  docker rm $NAME
	echo "Restart test system"
fi

#Start OwnCloud-apache-Containerd
docker run -dp 8888:80 -h $NAME --name=$NAME $IMAGE_NAME /sbin/my_init --enable-insecure-key

#Get IP of ownCLoud-Server
IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $NAME) 

protractor $TESTS/protractor_conf.js --params.baseUrl=$IP --suite install

#cd $SERVER_DIR
#php occ app:disable firstrunwizard

# Disabling the firstrunwizard via ssh
scp -i configs/insecure_key configs/disable_firstrunwizard.sh root@$IP:/tmp/disable_firstrunwizard.sh
ssh -i configs/insecure_key root@$IP /tmp/disable_firstrunwizard.sh

protractor $TESTS/protractor_conf.js --params.baseUrl=$IP --suite login
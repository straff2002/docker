#!/bin/bash

#Preparation
#===========

#Get insecure key if not available
if [[ ! -f configs/insecure_key ]]; then
	echo "Downloading insecure_key file for ssh connection"
	curl -o configs/insecure_key -fSL https://github.com/phusion/baseimage-docker/raw/master/image/insecure_key
	chmod 600 configs/insecure_key
fi

#Start OwnCloud-apache-Containerd
docker run -dp 80:80 --name="ownCloud" oc-apache /sbin/my_init --enable-insecure-key

#Get IP of ownCLoud-Server
IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" ownCloud) 

SERVER_DIR="/var/www/owncloud"

TESTS=$(dirname $0)
cd $TESTS
TESTS=$PWD

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$IP --suite install

#cd $SERVER_DIR
#php occ app:disable firstrunwizard

# Disabling the firstrunwizard via ssh
scp -i configs/insecure_key configs/disable_firstrunwizard.sh root@$IP:/tmp/disable_firstrunwizard.sh
ssh -i configs/insecure_key root@$IP /tmp/disable_firstrunwizard.sh

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$IP --suite login
#!/bin/bash

BASE_PATH=$(dirname $0)
cd $BASE_PATH

# PORT=8888
# SERVER_IMAGE_NAME="oc-apache"
# SERVER_NAME="oc-test"
# DB_IMAGE_NAME="db-mysql"
# DATA_IMAGE_NAME="data-vol"
# DB_NAME="oc-mysql"
# DATA_NAME="oc-data"
#
# DATA_VOLUME_DIR="/data-vol"
# [ -d $DATA_VOLUME_DIR ] || mkdir $DATA_VOLUME_DIR
#
# echo "Restart test system"
# docker rm -f $DATA_NAME > /dev/null 2>&1
# docker rm -f $DB_NAME > /dev/null 2>&1
# docker rm -f $SERVER_NAME > /dev/null 2>&1
#
# echo "Start ownCloud apache container with mysql and persistent data"
# docker run -dv $DATA_VOLUME_DIR:/data-vol --name=$DATA_NAME $DATA_IMAGE_NAME
# docker run -d -e MYSQL_PASS="rootpass" --name=$DB_NAME $DB_IMAGE_NAME
# docker run -dp $PORT:80 -h $SERVER_NAME --name=$SERVER_NAME --link=$DB_NAME:db --volumes-from $DATA_NAME $SERVER_IMAGE_NAME /sbin/my_init --enable-insecure-key


PORT=8888
SERVER_IMAGE_NAME="oc-nginx"
SERVER_NAME="oc-test"
DB_IMAGE_NAME="db-mysql"
DATA_IMAGE_NAME="data-vol"
DB_NAME="oc-mysql"
DATA_NAME="oc-data"

DATA_VOLUME_DIR="/data-vol"
[ -d $DATA_VOLUME_DIR ] || mkdir $DATA_VOLUME_DIR

echo "Restart test system"
docker rm -f $DATA_NAME 
docker rm -f $DB_NAME 
docker rm -f $SERVER_NAME 

echo "Start ownCloud nginx container with mysql and persistent data"
docker run -dv $DATA_VOLUME_DIR:/data-vol --name=$DATA_NAME $DATA_IMAGE_NAME
docker run -d -e MYSQL_PASS="rootpass" --name=$DB_NAME $DB_IMAGE_NAME
docker run -dp $PORT:8000/tcp -h $SERVER_NAME --name=$SERVER_NAME --link=$DB_NAME:db --volumes-from $DATA_NAME $SERVER_IMAGE_NAME /sbin/my_init --enable-insecure-key


# PORT=8888
# SERVER_IMAGE_NAME="oc-apache"
# SERVER_NAME="oc-test"
# echo "Restart test system"
# docker rm -f $SERVER_NAME > /dev/null 2>&1
#
# echo "Start OwnCloud-apache-Container with sqlite"
# docker run -dp $PORT:80 -h $SERVER_NAME --name=$SERVER_NAME $IMAGE_NAME /sbin/my_init --enable-insecure-key


echo "Discover IP"
#Get IP of ownCLoud-Server
IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $SERVER_NAME)
while ! ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@$IP ls -la /data-vol > /dev/null 2>&1
do
  printf "." && sleep 1
done

echo
echo "Data Volume:"
ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@$IP ls -la /data-vol

echo "Connect with:"
echo "ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@$IP"


# TEST_IMAGE_NAME="oc-vol-test"
# TEST_NAME="test"

# docker rm -f $TEST_NAME > /dev/null 2>&1
# docker run -d -h $TEST_NAME --name=$TEST_NAME --volumes-from $DATA_NAME $TEST_IMAGE_NAME /sbin/my_init --enable-insecure-key

# ssh-keygen -f "/home/felix/.ssh/known_hosts" -R 172.17.0.2
# ssh-keygen -f "/home/felix/.ssh/known_hosts" -R 172.17.0.3
# sleep 2
# docker ps -a
#
# ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@172.17.0.2 ls -la /data-vol
# ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@172.17.0.3 ls -la /data-vol
#
# echo "Discover Test IP"
# IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $TEST_NAME)
# while ! ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@$IP ls -la /data-vol > /dev/null 2>&1
# do
#   printf "." && sleep 1
# done
#
# echo "Connect with:"
# echo "ssh -o'UserKnownHostsFile /dev/null' -oStrictHostKeyChecking=no -i configs/insecure_key root@$IP"

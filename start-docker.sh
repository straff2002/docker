#!/bin/bash

PORT=8888

SERVER_IMAGE_NAME="oc-apache"
SERVER_NAME="oc-test"
DB_IMAGE_NAME="db-mysql"
DATA_IMAGE_NAME="data-vol"
DB_NAME="oc-mysql"
DATA_NAME="oc-data"
DATA_VOLUME_DIR="data-vol"
[ -d $DATA_VOLUME_DIR ] || mkdir $DATA_VOLUME_DIR

echo "Restart test system"
docker rm -f $DATA_NAME > /dev/null 2>&1
docker rm -f $DB_NAME > /dev/null 2>&1
docker rm -f $SERVER_NAME > /dev/null 2>&1

echo "Start OwnCloud-apache-Container with mysql and persistent data"
docker run -dv $DATA_VOLUME_DIR:/data-vol --name=$DATA_NAME $DATA_IMAGE_NAME
docker run -d -e MYSQL_PASS="rootpass" --name=$DB_NAME $DB_IMAGE_NAME
docker run -dp 8888:80 -h $SERVER_NAME --name=$SERVER_NAME --link=$DB_NAME:db --volumes-from $DATA_NAME $SERVER_IMAGE_NAME /sbin/my_init --enable-insecure-key

# PORT=8888
# SERVER_IMAGE_NAME="oc-apache"
# SERVER_NAME="oc-test"
# echo "Restart test system"
# docker rm -f $SERVER_NAME > /dev/null 2>&1
#
# echo "Start OwnCloud-apache-Container with sqlite"
# docker run -dp $PORT:80 -h $SERVER_NAME --name=$SERVER_NAME $IMAGE_NAME /sbin/my_init --enable-insecure-key

#!/bin/bash

# Build all images in folder images
# Images are named like folder name

BASE_PATH=$(dirname $0)
cd $BASE_PATH

IMAGE_PATH=$PWD/images

for IMAGE in `find $IMAGE_PATH -mindepth 1 -maxdepth 1 -type d`
do
  NAME=$(basename $IMAGE)
  echo "Found docker image $NAME"
  if [ $(docker images | grep $NAME -c ) -ne 0 ]
  then
  	echo "Image exists"
  else
  	echo "Building image"
  	docker build -t $NAME $IMAGE_PATH/$NAME
  fi
done



# Get insecure key if not available
# This key is part of the phusion/baseimage
if [ ! -f configs/insecure_key ]; then
	echo "Downloading insecure_key file for ssh connection"
	curl -o configs/insecure_key -fSL https://github.com/phusion/baseimage-docker/raw/master/image/insecure_key
	chmod 600 configs/insecure_key
fi





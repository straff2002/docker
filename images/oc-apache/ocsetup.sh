#!/bin/sh

if [ "$#" -eq 0 ] 
then 
  echo "Please specify a name of the installation"
  echo "./oc_setup name"
  echo
  exit
fi

NAME=$1 
INSTALL_PATH="$PWD/systems"
SOURCE_PATH="$PWD/sources"

# default is community edition  
EDITION="community"
VERSION="7.0.1"
SERVER_PATH="download.owncloud.org/community"

SERVER_ZIP="owncloud-$VERSION.tar.bz2"
SERVER_SOUCRE="$SERVER_PATH/$SERVER_ZIP"

INSTALL_NAME=$NAME-$EDITION-$VERSION
INSTALL_FOLDER=$INSTALL_PATH/$INSTALL_NAME

if [ ! -d $INSTALL_PATH ]; then mkdir $INSTALL_PATH; fi
if [ ! -d $SOURCE_PATH ]; then mkdir $SOURCE_PATH; fi

echo "Installing ${EDITION} ${VERSION} as ${INSTALL_NAME} in $INSTALL_FOLDER"
cd $INSTALL_PATH
if [ ! -d $INSTALL_NAME ]; 
then 
  mkdir $INSTALL_NAME
else 
  echo "Installation with this name already existing"
  exit 
fi

# Unpack ownCloud, will generate an owncloud folder
cd $SOURCE_PATH
if [ ! -f $SERVER_ZIP ]; then wget $SERVER_SOUCRE; fi
if [ $VERSION == "latest" ]; then rm $SERVER_ZIP; wget $SERVER_SOUCRE; fi
tar xf $SERVER_ZIP

# Move owncloud to specified installation path
cd $SOURCE_PATH
cp -R owncloud/* $INSTALL_FOLDER
cp owncloud/.htaccess $INSTALL_FOLDER
rm -rf owncloud

cd $INSTALL_FOLDER/apps
APP_COUNT=$( ls -1 | wc -l )
echo "Installed $APP_COUNT apps"
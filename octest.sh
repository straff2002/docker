#!/bin/sh

BASE_PATH=$(dirname $0)
cd $BASE_PATH

TESTS=$PWD/tests
DOCKER=$PWD/images
WWW=$PWD/www

OC_TEST_INSTANCE_NAME="test"
OC_TEST_INSTANCE_EDITION="community"
OC_TEST_INSTANCE_VERSION="7.0.1"
OC_TEST_INSTANCE="$OC_TEST_INSTANCE_NAME-$OC_TEST_INSTANCE_EDITION-$OC_TEST_INSTANCE_VERSION"

URL="http://127.0.0.1/octest/${OC_TEST_INSTANCE}/"
SERVER=$WWW/$OC_TEST_INSTANCE

echo $OC_TEST_INSTANCE
echo $URL
echo $SERVER

rm -rf $SERVER; ./ocsetup.sh test -c

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$URL --suite install

cd $SERVER
php occ app:disable firstrunwizard

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$URL --suite login


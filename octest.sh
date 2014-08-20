#!/bin/sh

BASE_PATH=$(dirname $0)
cd $BASE_PATH

TESTS=$PWD/tests
DOCKER=$PWD/images
SERVER=$PWD/www
URL="http://127.0.0.1/octest/test-community-7.0.1/"

OC_TEST_INSTANCE="test"

rm -rf $SERVER; ocsetup test -c

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$URL --suite install

cd $SERVER
php occ app:disable firstrunwizard

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$URL --suite login


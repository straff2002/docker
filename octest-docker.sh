#!/bin/bash

BASE_PATH=$(dirname $0)
cd $BASE_PATH

TESTS=$PWD/specs
SERVER_NAME="oc-test"
PORT=8888

#Get IP of ownCLoud-Server
IP=$(docker inspect -f "{{ .NetworkSettings.IPAddress }}" $SERVER_NAME) 
while ! ssh -oStrictHostKeyChecking=no -i configs/insecure_key root@$IP php -v > /dev/null 2>&1
do
  sleep 1
done

BASE_URL="http://127.0.0.1:$PORT/"

echo "Testing on $BASE_URL"
# Install with install test suite
# protractor $TESTS/protractor_conf.js --params.baseUrl=$BASE_URL --suite install

# Disabling the firstrunwizard via ssh
scp -i configs/insecure_key configs/disable_firstrunwizard.sh root@$IP:/tmp/disable_firstrunwizard.sh
ssh -i configs/insecure_key root@$IP /tmp/disable_firstrunwizard.sh

protractor $TESTS/protractor_conf.js --params.baseUrl=$BASE_URL --suite login
# protractor $TESTS/protractor_conf.js --params.baseUrl=$BASE_URL --specs specs/tests/login/authentication_spec.js
# protractor $TESTS/protractor_conf.js --params.baseUrl=$BASE_URL --specs specs/tests/login/change_password_spec.js
# protractor $TESTS/protractor_conf.js --params.baseUrl=$BASE_URL --specs specs/tests/login/new_user_spec.js
# protractor $TESTS/protractor_conf.js --params.baseUrl=$BASE_URL --specs specs/tests/login/username_cases_spec.js
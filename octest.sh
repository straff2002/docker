
SERVER="/Users/felix/Sites/ownCloud/deployment/systems/test-community-7.0.1"
URL="http://127.0.0.1/ownClouds/test-community-7.0.1/"

TESTS=$(dirname $0)
cd $TESTS
TESTS=$PWD


rm -rf $SERVER; ocsetup test -c

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$URL --suite install

cd $SERVER
php occ app:disable firstrunwizard

cd $TESTS
protractor $TESTS/protractor_conf.js --params.baseUrl=$URL --suite login
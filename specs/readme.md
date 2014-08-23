Spec Setup
==========

```
npm install
./node_modules/protractor/bin/webdriver-manager update
```

Install as global commands
```
npm install -g protractor
npm install -g gulp
```

Run tests
```
protractor protractor.conf.js
```

Run only a specific test suite
```
protractor protractor.conf.js --suite install
protractor protractor_conf.js --params.baseUrl="http://127.0.0.1/ownClouds/test-community-7.0.1/" --suite=login
protractor protractor_conf.js --params.baseUrl="http://127.0.0.1/ownClouds/test-community-7.0.1/" --specs tests/login/newUser_spec.js
```
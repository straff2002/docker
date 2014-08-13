Setup
-----

```
npm install
./node_modules/protractor/bin/webdriver-manager update
```

Install protractor as global command
```
npm install -g protractor
```

Run tests
```
protractor protractor.conf.js
```

Run only a specific test suite
```
protractor protractor.conf.js --suite install
```
var gulp = require('gulp'),
	protractorQA = require('gulp-protractor-qa');

// Registering the task
gulp.task('protractor-qa', function() {
    protractorQA.init({
        testSrc : 'tests/**/*_spec.js',
        viewSrc : [ 
          'views/install.html' 
        ]
    });
});

// Running it
gulp.task('default', ['protractor-qa']);
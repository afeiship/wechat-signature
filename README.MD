#gulp-bower-stream
Get gulp bower.json stream.


## usage:
+ install:
```bash
npm install --save-dev gulp-bower-stream
```

+ use:
```javascript
(function() {

  'use strict';
  var path = require('path')
  var gulp = require('gulp');
  var config = require('./config');
  var argv = require('yargs').argv;
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*']
  });


  var bowerStream =$.bowerStream({filter:'**'});
  var cssStream = $.bowerStream({filter:'**/*.css'});
  var jsStream = $.bowerStream({filter:'**/*.js'});

  
  gulp.task('inject-bower', function() {
    return gulp.src(path.join(config.path.src, './index.html'))
      .pipe($.inject(bowerStream,{name:'bower'}))
      .pipe(gulp.dest('dist'));
  });

}());
```

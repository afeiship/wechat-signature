(function() {


  'use strict';

  var gulp = require('gulp');
  var path = require('path')
  var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'gulp.*', 'del']
  });

  module.exports = function(inOptions) {
    var options = inOptions || {};
    var bowerFile = options.bowrfile || './bower.json';
    var filter = options.filter || '**';
    return gulp.src(bowerFile)
      .pipe($.mainBowerFiles())
      .pipe($.filter(filter));
  };


}());

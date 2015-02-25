'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  minifyCSS = require('gulp-minify-css');

$.minifyCSS = minifyCSS;


gulp.task('styles', function() {
  gulp.src('./app/styles/*.scss')
    .pipe($.compass({
      config_file: './config.rb',
      css: './static/styles',
      sass: './app/styles',
      javascript: './app/scripts',
      image: './app/images'
    }))
    .on('error', function () {
      this.emit('end');
    })
    .pipe(gulp.dest('static/styles'))
    .pipe($.minifyCSS())
    .pipe($.rename(function (path) {
      path.extname = '.min.css';
    }))
    .pipe(gulp.dest('static/styles'));
});

gulp.task('watch', ['styles'], function () {
  gulp.watch(['app/styles/{,**/}*.{scss,css}'], ['styles']);
});

'use strict';

var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  minifyCSS = require('gulp-minify-css'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  runSequence = require('run-sequence');

$.minifyCSS = minifyCSS;


gulp.task('styles', function() {
  gulp.src('./app/styles/**/*.scss')
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


gulp.task('styleguide', function() {
  gulp.src('./app/styles/**/*.scss')
    .pipe($.kss({
      overview: __dirname + '/styleguide/styleguide.md'
    }))
    .pipe(gulp.dest('styleguide/public'));

  gulp.src('./static/styles/main.css')
    .pipe($.concat('styleguide/public/public/style.css'))
    .pipe(gulp.dest('styleguide/public/public/'));
});


gulp.task('watch', ['styles'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    server: ['static']
  });

  gulp.watch(['static/**/*.{html}'], [reload]);
  gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', 'styleguide', reload]);
});


gulp.task('default', function (cb) {
  runSequence('styles', ['styleguide'], cb);
});

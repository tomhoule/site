'use strict';

// load plugins
var $ = require('gulp-load-plugins')();

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require('gulp'),
    del = require('del'),
    chalk = require('chalk'),
    pkg = require('./package.json'),
    assemble = require('assemble');

// handle errors
var onError = function(error) {
    console.log(chalk.red('You fucked up:', error.message, 'on line' , error.lineNumber));
    this.emit('end');
}


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Terminal Banner
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log("");
console.log(chalk.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"));
console.log(chalk.cyan(""));
console.log(chalk.cyan("      (o) Just what do you think you're doing, Matthias?    "));
console.log(chalk.cyan(""));
console.log(chalk.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"));
console.log("");


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

var src      = 'src/',
    dist     = 'dist/';


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Tasks
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Delete build artifacts
//
gulp.task('clean', function() {
    return del(dist + '**/*');
});


//
// Copy stuff
//
gulp.task('copy', function() {
    return gulp.src([
            src + 'assets/**/*.*',
            '!' + src + 'assets/{js,styl}/**/*.*'
        ])
        .pipe(gulp.dest(dist + 'assets/'));
});


//
// Styles
//
gulp.task('css', function() {
    return gulp.src(src + 'assets/styl/plumage.styl')
        .pipe($.stylus({
            'include css': true
        }).on('error', onError))
        .pipe($.autoprefixer({ browsers: 'last 2 versions, ie 9' }))
        .pipe($.cssmin())
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist + 'assets/css/'))
        .pipe($.connect.reload());
});


//
// JavaScript
//
gulp.task('js', function() {
    return gulp.src(src + 'assets/js/plumage.js')
        .pipe($.include())
        .pipe($.uglify()).on('error', onError)
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist + 'assets/js/'))
        .pipe($.connect.reload());
});


//
// HTML
//
var assemble = assemble();

assemble: {
  options: {
    data: src + '_site.yml'
  }
}

gulp.task('load', function(cb) {
    assemble.data('./site.json');
    assemble.partials(src + 'templates/partials/*.*');
    assemble.layouts(src + 'templates/layouts/*.*');
    assemble.pages(src + 'templates/pages/*.*', { layout: 'default' });
    cb();
});

gulp.task('assemble', ['load'], function() {
  return assemble.toStream('pages')
    .pipe(assemble.renderFile())
    .pipe($.htmlmin())
    .pipe($.extname())
    .pipe(assemble.dest(dist))
    .pipe(gulp.dest(dist))
    .pipe($.connect.reload());
});

gulp.task('html', ['assemble', 'css', 'js']);


//
// Dev Server
//
gulp.task('connect', function() {
    return $.connect.server({
        root: [dist],
        livereload: true,
        port: 1337
    });
});


//
// Watch task
//
gulp.task('watch', function() {
    gulp.watch([src + '**/*'], ['build']);
});


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Dev Server
//
gulp.task('default', ['build', 'connect', 'watch']);


//
// Full build
//
gulp.task('build', ['copy', 'html']);

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var inject = require('gulp-inject');

gulp.task('index', function () {
	gulp.src('./index.html').pipe(gulp.dest('./public'));

	var target = gulp.src('./public/index.html');
	var sources = gulp.src(['./public/site.min.css'], { read: false });

	return target.pipe(inject(sources, { relative: true })).pipe(gulp.dest('./public/'));
});

gulp.task('moveAssets', function () {
	gulp.src('./assets/fonts/**/*.*')
	.pipe(gulp.dest('./public/fonts'));

	gulp.src('./assets/images/**/*.*')
	.pipe(gulp.dest('./public/images'));
});

gulp.task('sass', function () {
	return gulp.src('./assets/stylesheets/site.scss')
    .pipe(sass({
    	outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(rename('site.min.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('default', ['sass', 'moveAssets', 'index'], function () {

});
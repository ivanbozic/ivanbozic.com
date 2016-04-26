'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var rev = require('gulp-rev');

gulp.task('clean', function () {
	return gulp.src('./public/**/*.*', { read: false }).pipe(clean());
});

gulp.task('sass', function () {
	return gulp.src('./assets/stylesheets/site.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(rev())
	.pipe(gulp.dest('./public'));
});

gulp.task('js', function () {
	return gulp.src('./assets/javascripts/**/*.js')
	.pipe(concat('site.js'))
	.pipe(rev())
	.pipe(gulp.dest('./public'));
});

gulp.task('moveAssets', function () {
	gulp.src('./assets/fonts/**/*.*')
	.pipe(gulp.dest('./public/fonts'));

	gulp.src('./assets/images/**/*.*')
	.pipe(gulp.dest('./public/images/'));

	gulp.src('./assets/public/**/*.*')
	.pipe(gulp.dest('./public'));

	return gulp.src('./index.html').pipe(gulp.dest('./public'));
});

gulp.task('index', function () {
	var target = gulp.src('./public/index.html');
	var sources = gulp.src(['./public/**/*.css', './public/**/*.js'], { read: false });

	return target.pipe(inject(sources, { relative: true })).pipe(gulp.dest('./public/'));
});

gulp.task('default', function (callback) {
	runSequence('clean', 'sass', 'js', 'moveAssets', 'index', callback);
});
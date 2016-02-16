'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var clean = require('gulp-clean');
var rev = require('gulp-rev');

gulp.task('clean', function () {
	gulp.src('./public/**/*.*', { read: false }).pipe(clean());
});

gulp.task('sass', ['clean'], function () {
	return gulp.src('./assets/stylesheets/site.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(rev())
	.pipe(gulp.dest('./public'));
});

gulp.task('moveAssets', ['sass'], function () {
	gulp.src('./assets/fonts/**/*.*')
	.pipe(gulp.dest('./public/fonts'));

	gulp.src('./assets/images/**/*.*')
	.pipe(gulp.dest('./public/images'));

	gulp.src('./assets/public/**/*.*')
	.pipe(gulp.dest('./public'));

	return gulp.src('./index.html').pipe(gulp.dest('./public'));
});

gulp.task('index', ['moveAssets'], function () {
	var target = gulp.src('./public/index.html');
	var sources = gulp.src(['./public/**/*.css'], { read: false });

	return target.pipe(inject(sources, { relative: true })).pipe(gulp.dest('./public/'));
});

gulp.task('default', ['index'], function () {

});
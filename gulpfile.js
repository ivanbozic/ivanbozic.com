'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var rev = require('gulp-rev');

gulp.task('clean', function () {
	return del([
		'./public/**/*'
	]);
});

gulp.task('sass', ['clean'], function () {
	return gulp.src('./assets/stylesheets/site.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}).on('error', sass.logError))
	.pipe(rev())
	.pipe(gulp.dest('./public'));
});

gulp.task('js', ['clean'], function () {
	return gulp.src('./assets/javascripts/**/*.js')
	.pipe(concat('site.js'))
	.pipe(rev())
	.pipe(gulp.dest('./public'));
	// return gulp.src('./assets/javascripts/**/*.js')
	// .pipe(uglify())
	// .pipe(gulp.dest('./public'));
});

gulp.task('moveAssets', ['sass', 'js'], function () {
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
	var sources = gulp.src(['./public/**/*.css', './public/**/*.js'], { read: false });

	return target.pipe(inject(sources, { relative: true })).pipe(gulp.dest('./public/'));
});

gulp.task('default', ['index'], function () {

});
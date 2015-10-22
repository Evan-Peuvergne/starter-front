	



	/**
	*
	*	GULPFILE|JS
	*	----------------------------
	* 	DESC | Tasks runner definition
	*	LOCATION | > gulpfile.js
	*
	*/





	/*----------  DEPENDENCIES  ----------*/



	// Gulp

	var gulp = require('gulp');


	// Html

	var extend = require('gulp-html-extend');


	// Styles

	var sass = require('gulp-sass');
	var autoprefixer = require('gulp-autoprefixer');
	var csslint = require('gulp-csslint');


	// Scripts

	var concat = require('gulp-concat');


	// Utils

	var rename = require('gulp-rename');
	var notify = require('gulp-notify');


	// Testing

	var plumber = require('gulp-plumber');
	var browserSync = require('browser-sync');














	/*----------  TASKS  ----------*/



	// Html

	gulp.task('html', function ()
	{

		// Extend
		gulp.src('resources/templates/pages/**/*.html')
			.pipe(extend({ annotations:true, verbose:false }))
			.pipe(gulp.dest('pages/'));

		// Reload
		browserSync.reload();

	});


	// Sass

	gulp.task('sass', function ()
	{

		// Sass
		gulp.src('resources/styles/style.scss')
			.pipe(plumber())
			.pipe(sass())
			.pipe(autoprefixer())
			.pipe(gulp.dest('assets/styles/'))
			.pipe(browserSync.stream())

	});


	// Js

	gulp.task('js', function ()
	{

		// Script
		gulp.src('resources/scripts/**/*.js')
			.pipe(concat('app.js'))
			.pipe(gulp.dest('assets/js/scripts'));

	});


	// Compress

	gulp.task('compress', function ()
	{

		// Js
		// ...

	});














	/*----------  WATCHERS  ----------*/



	// Dev

	gulp.task('dev', ['sass'], function ()
	{

		// Serve
		browserSync.init({ server: { baseDir: '' } });

		// Watchers
		gulp.watch('resources/styles/**/*.scss', ['sass']);
		gulp.watch('resources/templates/**/*.*', ['html']);
		gulp.watch('resources/scripts/**/*.*', ['js']);

	});


	// Default

	gulp.task('default', ['dev']);




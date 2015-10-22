



	/**
	*
	*	GULPFILE.JS
	* 	Tasks runner definition
	*
	*/





	/*----------  DEPENDENCIES  ----------*/



	// Gulp

	var gulp = require('gulp');


	// Templates

	var include = require('gulp-file-include');


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

		gulp.src('resources/templates/**/*.html')
			.pipe(include({ prefix: '@@', basepath: 'resources/templates' }))
			.pipe(gulp.dest('pages/'));

	});


	// Sass

	gulp.task('sass', function ()
	{

		gulp.src('resources/styles/style.scss')
			.pipe(plumber())
			.pipe(sass())
			.pipe(autoprefixer())
			.pipe(gulp.dest('assets/styles/'))
			.pipe(browserSync.stream())
			.pipe(notify("Fichier : <%= file.relative %>"));

	});


	// Js

	gulp.task('js', function ()
	{

		gulp.src('resources/scripts/**/*.*')
			.pipe(plumber())
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest('assets/js/scripts/'));

	});



	


	/*----------  WATCHERS  ----------*/



	// Dev

	gulp.task('dev', ['sass'], function ()
	{

		// BrowserSync
		browserSync.init([], 
		{
			// proxy: "127.0.0.1:8888",
			server: { baseDir: '' },

		});

		// Watches
		gulp.watch('resources/styles/**/*.scss', ['sass']);
		gulp.watch('resources/templates/**/*.*', ['html']).on('change', browserSync.reload);
		gulp.watch('resources/scripts/**/*.js', ['js']).on('change', browserSync.reload);

	});


	// Default

	gulp.task('default', ['dev']);
	
	
	
	
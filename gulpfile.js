// variables
var gulp       = require('gulp');
var shell      = require('gulp-shell');
var jade       = require('gulp-jade');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var minifyCSS  = require('gulp-minify-css');
var rename     = require('gulp-rename');
var gulpif     = require('gulp-if');
var notify     = require('gulp-notify');
var plumber    = require('gulp-plumber');
var connect    = require('gulp-connect');
var imagemin   = require('gulp-imagemin');
var pngquant   = require('imagemin-pngquant');
var livereload = require('gulp-livereload');
var bowerFiles = require('main-bower-files');


// JSON containing the content for jade templates
var resumeData = require('./_src/templates/content/mpaiva.json')

// get nodejs environment mod
// command to set environment > NODE_ENV=production gulp

var env = process.env.NODE_ENV || 'development';

// directories
var outputDir      = 'builds/';
var materializeDir = 'bower_components/materialize/'
var jQueryDir      = 'bower_components/jquery/dist/'

// tasks

	// shell - Send terminal commands here
	gulp.task('shell', shell.task([
	  'clear'
	]));

	// jade
	gulp.task('jade', function() {

		// name your supporting jade blocks and includes 
		// with "_" to be ignored by the following expression:
		// "_src/templates/**/!(_)*.jade" 
	    
	    return gulp.src('_src/templates/**/!(_)*.jade')
	      .pipe(plumber())
	      .pipe(
	      	gulpif( env === 'development', 
	      		// if dev
	      		jade( { pretty: true, 
	      				locals: resumeData } ),
	      		// else
	      		jade( { pretty: false, 
	      				locals: resumeData } )
	      		))
	      .pipe(gulp.dest(outputDir + env))
	      .pipe(notify({
			      message: "<%= file.relative %> created successfuly",
			      templateOptions: {
			        date: new Date()
			      }
			  }))
	      .pipe(livereload())
	});

	// Bower Files Packaging
	gulp.task('bowerFiles', function() {
	  return gulp.src(bowerFiles(), {
	      base: 'bower_components'
	    })
	      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	      .pipe(gulp.dest(outputDir + env + '/lib'))
	      .pipe(notify({
			      message: "<%= file.relative %> created successfuly",
			      templateOptions: {
			        date: new Date()
			      }
			  }))
	      .pipe(livereload());
	});

	// sass
	gulp.task('sass', function() {
	    return gulp.src( '_src/sass/**/!(_)*.scss' )
	      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	      .pipe(	      
	      	gulpif( env === 'development', 
	      		// if dev
	      		sass({ sourceComments: 'map' }),
	      		// else
	      		sass()
	      	)
	      )
	      // .pipe(gulpif(env === 'production', minifyCSS()))
	      .pipe(gulp.dest(outputDir + env + '/css/'))
	      .pipe(notify({
			      message: "<%= file.relative %> created successfuly",
			      templateOptions: {
			        date: new Date()
			      }
			  }))
	      .pipe(livereload())
	});

	// images
	gulp.task('images', function() {
	    return gulp.src( '_src/assets/images/**/!(_)*.*' )
		  	.pipe(imagemin({
			    progressive: true,
			    svgoPlugins: [{removeViewBox: false}],
			    use: [pngquant()]
					}))
	      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	      .pipe(gulp.dest(outputDir + env + '/images/'))
	      .pipe(notify({
			      message: "<%= file.relative %> created successfuly",
			      templateOptions: {
			        date: new Date()
			      }
			  }))
	      .pipe(livereload())
	});

	// download folder
	gulp.task('downloads', function() {
	    return gulp.src( '_src/assets/downloads/**/!(_)*.*' )
	      .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
	      .pipe(gulp.dest(outputDir + env + '/downloads/'))
	      .pipe(notify({
			      message: "<%= file.relative %> created successfuly",
			      templateOptions: {
			        date: new Date()
			      }
			  }))
	      .pipe(livereload())
	});


// Watch task
gulp.task('watch', function() {
	var server = livereload();
 	gulp.watch( '_src/templates/**/!(_)*.jade', ['jade']);
 	gulp.watch( '_src/sass/**/!(_)*.scss', ['sass']);
 	gulp.watch( 'bower_components/**/*.*', ['bowerFiles']);
 	gulp.watch( '_src/assets/images/**/!(_)*.*', ['images']);
 	gulp.watch( '_src/assets/downloads/**/!(_)*.*', ['downloads']);
	});

	// Git Automation - 
	gulp.task('git', shell.task([
	  'git status',
	  'git add .',
	  'git commit -m \'Gulp Git task detected changes.\'',
	  'git push origin'
	]));

	// Build Production

	gulp.task('production', shell.task([
	  'NODE_ENV=production gulp'
	]));

// Default tasks
gulp.task('default', ['shell', 'bowerFiles', 'sass', 'jade', 'images', 'downloads', 'watch']);

// end


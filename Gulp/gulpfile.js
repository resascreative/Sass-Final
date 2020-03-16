let gulp = require('gulp');
//to bring in imagemin:
let imagemin = require('gulp-imagemin');
let uglify = require('gulp-uglify');
let sass = require('gulp-sass');


// TOP LEVEL FUNCTIONS

// gulp.task - define tasks 
// gulp.src - point to files to use 
// gulp.dist - points to folder to output 
// gulp.watch - watch files and folders for changes 

//logs message
gulp.task('wassup', function(done) {
    // return gulp.src('package.json')//need this to rid of 'did you forget to signal async completion
    console.log('wassup, Resa'); done();
});

//to run console by default change wassup to default

// gulp.task('default', function(done) {
//   console.log('wassup, Resa'); done();
// });

//copy all HTML files
gulp.task('copyHtml', function(done) 
{
  gulp.src('src/*.html')
    .pipe(gulp.dest('dist'));
    done();
});

//optimize images (plugin gulp imagemin)
//npm install --save-dev gulp-imagemin
//dont forget to bring it in (line 2)
gulp.task ('imageMin', () => 
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

//minify js code
//npm install --save-dev gulp-uglify
//dont forget to bring it in (line 3)
gulp.task('minify', function(done) 
{
  gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
    done();
});

//compile sass
//npm install --save-dev gulp-sass
gulp.task('sass', function(done) 
{
    gulp.src('src/sass/*.scss')
      .pipe(sass().on('error', sass.logError)) 
      .pipe(gulp.dest('dist/css'));//in css folder to convert to css!
      done();
});

// gulp.task('default', ['hello', 'copyHtml', 'imageMin', 'minify', 'sass']);

gulp.task('watch', function()
{
  // gulp.watch('src/js/*.js', gulp.series('scripts'));//file path and [name of task]
  gulp.watch('src/images/*',gulp.series('imageMin'));
  gulp.watch('src/sass/*.scss', gulp.series('sass'));
  gulp.watch('src/*.html', gulp.series('copyHtml'));
  // done();
});

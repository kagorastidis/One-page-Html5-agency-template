
var gulp = require('gulp');

var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');

var htmlreplace = require('gulp-html-replace');
 
var minifyHTML = require('gulp-minify-html');

var uncss = require('gulp-uncss');

//remove unused CSS

gulp.task('uncss', function() {
    gulp.src('site.css')
        .pipe(uncss({
            html: ['index.html', 'about.html']
        }))
        .pipe(gulp.dest('./out'));
});


// minify new or changed HTML pages
gulp.task('htmlpage', function() {
  var htmlSrc = 'src/*.html',
      htmlDst = 'build';

  gulp.src(htmlSrc)
   .pipe(htmlreplace({
        'css': 'css/style.min.css',
        'js': 'js/app.min.js'
    }))
    .pipe(changed(htmlDst))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDst));
});



// minify new images
gulp.task('imagemin', function() {
  var imgSrc = 'src/img/**/*',
      imgDst = 'build/img';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});


// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src(['src/js/lib.js','src/js/*.js'])
    .pipe(concat('app.min.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('build/js/'));
});

// include plug-ins
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
  gulp.src(['src/css/*.css'])
    .pipe(concat('style.min.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css/'));
});



gulp.task('uncss', function() {
    gulp.src('build/css/*.css')
        .pipe(uncss({
            html: ['build/index.html']
        }))
        .pipe(gulp.dest('build/css/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles', 'uncss',], function() {
});


/* 1)Install Node js
   2)npm Install gulp -g

   i)   cd to project
   ii)  npm install gulp --save-dev
   iii) npm install gulp-changed gulp-imagemin gulp-minify-html gulp-html-replace gulp-concat gulp-strip-debug gulp-uglify gulp-autoprefixer gulp-minify-css npm install gulp-uncss --save-dev
   iv)  gulp

*/
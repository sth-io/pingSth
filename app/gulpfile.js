//get basic vars
var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    colors = require('colors'),
    watch = require('gulp-watch'),
    Imagemin = require('imagemin'),
    browserSync = require('browser-sync').create();

// your variables
var projectName = "notesth";

// notify on errors
var onError = function (err) {
    console.log(err)
    console.log('['+'! ERROR FOUND !'.red + ']');
    console.log('line:column: '.cyan + err.line + ':' + err.column + ' |  type: '.cyan + err.type);
    console.log('file: '.cyan + err.fileName.gray);
    console.log('message'.yellow);
    console.log(err.message.grey)
    console.log('details'.yellow);
    console.log(err.extract);
    console.log('['+'! ----------- !'.red + ']');
    this.emit('end');
};

gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('less-watch', ['less'], browserSync.reload);

gulp.task('serve', ['less'], function() {
    browserSync.init({
        server: "./",
        files: ["./_dist/css/*.css", "./_dist/js/*.js", "./_dist/img/*.*"]
    });
    gulp.start('watch');
    gulp.watch("*.html").on('change', browserSync.reload);
});

// less task
gulp.task('less', function () {
    return gulp.src('./_src/less/base.less')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(rename(projectName+'.min.css'))
        .pipe(gulp.dest('./_dist/css'))
        .pipe(browserSync.stream());
});

// javascript concatenation and minification
gulp.task('js', function () {
    return gulp.src('./_src/js/**/*.js')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(concat(projectName + '.min.js'))
        .pipe(uglify({
            mangle: false
        }))
        .pipe(gulp.dest('./_dist/js'))
        .pipe(browserSync.stream());
});

//  concatenate your library. Insert it into array at
// return gulp.src([ 'array elem', 'array elem' ])
var libpath = './_src/lib/'
gulp.task('lib', function () {
    return gulp.src([
        libpath+'angular/angular.min.js',
        libpath+'angular-cookies/angular-cookies.min.js',
        libpath+'angular-route/angular-route.min.js',
        libpath+'angular-local-storage/dist/angular-local-storage.min.js',
        libpath+'d3/d3.min.js',
        libpath+'angular-charts/dist/angular-charts.min.js'
    ])
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(concat(projectName + '-lib.min.js'))
        .pipe(gulp.dest('./_dist/js'));
});

gulp.task('watch', function () {
    watch('./_src/less/**/*.less', function () {
        gulp.start('less');
        gulp.start('less-watch');
    });
    watch('./_src/js/**/*.js', function () {
        gulp.start('js');
        gulp.start('js-watch');
    });
});

gulp.task('compress-img', function(){
  new Imagemin()
      .src('_src/img/**/*.{gif,jpg,png,svg,JPG}')
      .dest('_dist/img')
      .use(Imagemin.jpegtran({progressive: true}))
      .use(Imagemin.gifsicle({interlaced: true}))
      .use(Imagemin.optipng({optimizationLevel: 3}))
      .run(function (err, files) {
          console.log(files[0]);
          // => {path: 'build/images/foo.jpg', contents: <Buffer 89 50 4e ...>}
      });
})

gulp.task('build', function(){
    gulp.start('less');
    gulp.start('js');
    gulp.start('lib');
    gulp.start('compress-img');
})




//used to add new styles for UI KIT preview
gulp.task('uikit', function () {
    return gulp.src('./_src/_uikit/less/base.less')
        .pipe(plumber({
          errorHandler: onError
        }))
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(rename('uikit.min.css'))
        .pipe(gulp.dest('./_src/_uikit/css/'));
});
gulp.task('uikit-watch', function () {
    watch('./_src/_uikit/less/*.less', function () {
        gulp.start('uikit');
    });
});

var gulp = require('gulp'),
    less = require('gulp-less'),
    path = require('path'),
    minifyCSS = require('gulp-minify-css'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    plumber = require('gulp-plumber'),
    watch = require('gulp-watch');

gulp.task('less', function() {
    return gulp.src('./assets/less/app.less')
        .pipe(plumber())
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('concatjs', function() {
    return gulp.src('./assets/js/**/*.js')
        .pipe(plumber())
        .pipe(concat('notesth.min.js'))
        // .pipe(ngAnnotate())
        // .pipe(uglify({
        //     mangle: false
        // }))
        .pipe(gulp.dest('./public/'));

});

gulp.task('concat-lib', function() {
    return gulp.src([
        './assets/lib/angular/angular.min.js',
        './assets/lib/angular-route/angular-route.min.js',
        './assets/lib/angular-local-storage/dist/angular-local-storage.min.js',
        './assets/lib/d3/d3.min.js',
        './assets/lib/angular-charts/dist/angular-charts.min.js'
    ])
        .pipe(plumber())
        .pipe(concat('notesth-lib.min.js'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
    watch('./assets/less/**/*.less', function() {
        gulp.start('less');
    });
    watch('./assets/js/**/*.js', function() {
        gulp.start('concatjs');
    });
});

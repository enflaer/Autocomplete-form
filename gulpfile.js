'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    concatCss = require('gulp-concat-css'),
    concatJs = require('gulp-concat'),
    prefix = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify');

var outputDir = 'dist/';
var appDir = 'app/';

gulp.task('sass', function () {
    return gulp.src(appDir + '/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(appDir + '/css'));
});

gulp.task('concatCss', function () {
    return gulp.src([appDir + '/css/*.css'])
        .pipe(concatCss("main.css"))
        .pipe(prefix('last 3 versions'))
        .pipe(csso())
        .pipe(gulp.dest(outputDir + '/css/'));
});

gulp.task('concatJs', function () {
    return gulp.src(['node_modules/jquery/dist/jquery.min.js', appDir + '/js/*.js'])
        .pipe(concatJs('main.js'))
        .pipe(gulp.dest(outputDir + '/js'));
});

gulp.task('watch', function () {
    gulp.watch(appDir + 'scss/*.scss', gulp.series('sass'));
    gulp.watch(appDir + 'css/*.css', gulp.series('concatCss'));
    gulp.watch(appDir + 'js/*.js', gulp.series('concatJs'));
});


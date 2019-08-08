// Defining base pathes
var basePaths = {
    node: './node_modules/',
    dev: './'
};

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var merge2 = require('merge2');
var ignore = require('gulp-ignore');
var rimraf = require('gulp-rimraf');
var imageop = require('gulp-image-optimization');


gulp.task('copy-assets', function() {
    gulp.src(basePaths.node + 'bootstrap/dist/js/**/*.js')
       .pipe(gulp.dest('./js'));
    gulp.src(basePaths.node + 'tether/dist/js/**/*.js')
       .pipe(gulp.dest('./js'));
    gulp.src(basePaths.node + 'bootstrap/assets/fonts/bootstrap/*.{ttf,woff,eof,svg,woff2}')
        .pipe(gulp.dest('./fonts'));
    gulp.src(basePaths.node + 'font-awesome/fonts/**/*.{ttf,woff,eof,svg,woff2}')
        .pipe(gulp.dest('./fonts'));
    gulp.src(basePaths.node + 'font-awesome/css/*.css')
        .pipe(gulp.dest('./css'));
    gulp.src(basePaths.node + 'jquery/dist/*.js')
        .pipe(gulp.dest('./js'));
    gulp.src(basePaths.node + 'owl.carousel/dist/*.js')
        .pipe(gulp.dest('./js'));
    gulp.src(basePaths.node + 'smoothScroll/*.js')
        .pipe(gulp.dest('./js'));
    gulp.src(basePaths.node + 'skrollr/dist/*.js')
        .pipe(gulp.dest('./js'));
    gulp.src(basePaths.node + 'bootstrap-validator/dist/*.js')
        .pipe(gulp.dest('./js'));

});

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

gulp.task('minifycss', ['cleancss'], function(){
  return gulp.src('./css/*.css')
    .pipe(plumber())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('./css/'));
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./css/theme.css', ['minifycss']);
});

gulp.task('cleancss', function() {
  return gulp.src('./css/*.min.css', { read: false }) // much faster 
    .pipe(ignore('theme.css'))
    .pipe(rimraf());
});

gulp.task('cleandist', ['minifycss'],  function() {
  return gulp.src('./dist/', { read: false }) // much faster 
    .pipe(rimraf());
});

// @task dist moves all js, css, img and fonts to dist folder and minifies css
gulp.task('dist', ['cleandist'], function(){
    gulp.src('./fonts/*.{ttf,woff,eof,svg, woff2}')
        .pipe(gulp.dest('./dist/fonts'));

    gulp.src('./vid/*.*')
        .pipe(gulp.dest('./dist/vid'));

    gulp.src('./img/*.{jpg,jepg,png,svg,gif}')
        .pipe(gulp.dest('./dist/img'));

    gulp.src('./css/*.css')
        .pipe(gulp.dest('./dist/css'));

        gulp.src('./php/*.php')
        .pipe(gulp.dest('./dist/php'));

    gulp.src('./*.{html,ico}')
        .pipe(gulp.dest('./dist'));

    gulp.src('./js/*.min.js')
        .pipe(gulp.dest('./dist/js'));

    gulp.src(['img/*.png','img/*.jpg','img/*.gif','img/*.jpeg']).pipe(imageop({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('dist/img'));

});

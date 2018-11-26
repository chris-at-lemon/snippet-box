var
    gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    postcss = require('gulp-postcss'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect');

var htmlSources = ['./dist/**/*.html'];

var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass', function () {
    return gulp.src('./source/scss/**/*.scss').pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist/css'));
});


gulp.task('css', function () {
    return gulp.src('./source/*.css')
        .pipe(postcss())
        .pipe(gulp.dest('./dest'));
});

gulp.task('watch', function () {
    gulp.watch('./source/**/*.scss', ['sass']);
    gulp.watch('./dist/**/*.html', ['html']);
});

gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});

gulp.task('connect', function() {
    connect.server({
        root: '.',
        livereload: true
    })
});

gulp.task('default', function () {
    return gulp.src('./source/scss/**/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default', ['html', 'sass', 'css', 'connect', 'watch']);
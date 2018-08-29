const gulp = require('gulp');
const less = require('gulp-less');
const clean_css = require('gulp-clean-css');
const babel = require('gulp-babel');
const react = require('gulp-react');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const path = require('path');

gulp.task('less', () => {
    return gulp
        .src('./assets/css/master.less')
        .pipe(less())
        .pipe(gulp.dest('./assets/css/dist'))
        .pipe(clean_css())
        .pipe(gulp.dest('./assets/css/dist'));
});

gulp.task('react', () => {
    return gulp
        .src('./assets/js/src/**/*.jsx')
        .pipe(react())
        .pipe(babel({ presets: ['env'] }))
        .pipe(concat('master_jsx.js'))
        .pipe(gulp.dest('./assets/js/dist'))
});

gulp.task('es7', ['react'], () => {
    return gulp
        .src([
            './assets/js/src/**/*.js',
            '!./dist'
        ])
        .pipe(babel({ presets: ['env'] }))
        .pipe(concat('master_js.js'))
        .pipe(gulp.dest('./assets/js/dist'))
});

gulp.task('js', ['es7'], () => {
    return gulp
        .src([
            './assets/js/dist/master_js.js',
            './assets/js/dist/master_jsx.js'
        ])
        .pipe(concat('master.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./assets/js/dist'))
});

gulp.task('default', ['less', 'js']);

gulp.task('watch', () => {
    gulp.start('less');
    gulp.start('js');
    gulp.watch('./assets/css/master.less', ['less']);
    gulp.watch('./assets/js/src/**/*.js', ['js']);
    gulp.watch('./assets/js/src/**/*.jsx', ['js']);
});

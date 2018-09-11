const gulp = require('gulp');
const less = require('gulp-less');
const mini_css = require('gulp-clean-css');
const babel = require('gulp-babel');
const react = require('gulp-react');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const clean = require('gulp-clean');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const path = require('path');

gulp.task('less', () => {
    return gulp
        .src([
            './resources/less/*.less',
            './resources/less/**/*.less'
        ])
        .pipe(plumber())
        .pipe(less())
        .pipe(concat('master.css'))
        .pipe(gulp.dest('./public/css'))
        .pipe(mini_css())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('react', () => {
    return gulp
        .src([
            './resources/jsx/*.jsx',
            './resources/jsx/**/*.jsx'
        ])
        .pipe(plumber())
        .pipe(react())
        .pipe(babel({ presets: ['env'] }))
        .pipe(concat('master_jsx.js'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('es7', ['react'], () => {
    return gulp
        .src([
            './resources/js/*.js',
            './resources/js/**/*.js'
        ])
        .pipe(plumber())
        .pipe(babel({ presets: ['env'] }))
        .pipe(concat('master_js.js'))
        .pipe(gulp.dest('./public/js'))
});

gulp.task('js', ['es7'], () => {
    return gulp
        .src([
            './public/js/master_js.js',
            './public/js/master_jsx.js'
        ])
        .pipe(plumber())
        .pipe(concat('master.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
});

gulp.task('clean_js', ['js'], () => {
    return gulp
        .src(['./public/js/master_js.js', './public/js/master_jsx.js'], { read: false })
        .pipe(plumber())
        .pipe(clean({ force: true }));
});

gulp.task('default', ['less', 'js', 'clean_js']);

gulp.task('watch', () => {
    gulp.start(['less']);
    gulp.start(['js', 'clean_js']);

    watch([
        './resources/less/*.less',
        './resources/less/**/*.less'
    ], () => {
        gulp.start(['less']);
    });

    watch([
        './resources/js/**/*.js',
        './resources/js/*.js',
        './resources/jsx/**/*.jsx',
        './resources/jsx/*.jsx'
    ], () => {
        gulp.start(['js', 'clean_js']);
    })
});

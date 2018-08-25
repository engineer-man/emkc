const gulp = require('gulp');
const less = require('gulp-less');
const clean_css = require('gulp-clean-css');
const path = require('path');

gulp.task('less', () => {
    return gulp.src('./assets/css/*.less')
        .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
        .pipe(gulp.dest('./assets/css'))
        .pipe(clean_css())
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['less']);

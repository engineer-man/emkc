const gulp = require('gulp');
const less = require('gulp-less');
const clean_css = require('gulp-clean-css');
const babel = require('gulp-babel');
const react = require('gulp-react');
const path = require('path');

gulp.task('less', () => {
    return gulp.src('./assets/css/*.less')
        .pipe(less({paths: [ path.join(__dirname, 'less', 'includes') ]}))
        .pipe(gulp.dest('./assets/css/dist'))
        .pipe(clean_css())
        .pipe(gulp.dest('./assets/css/dist'));
});

gulp.task('js', () =>
    gulp.src('./assets/js/*.js')
        .pipe(babel({ presets: ['env'] }))
        .pipe(gulp.dest('./assets/js/dist'))
);

gulp.task('react', () =>
    gulp.src('./assets/js/*.jsx')
        .pipe(react())
        .pipe(gulp.dest('./assets/js/dist'))
);

gulp.task('default', ['less', 'js', 'react']);

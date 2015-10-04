var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('js', function () {
  gulp.src('src/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat('product-page-custom.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function () {
  gulp.src('src/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['js', 'css']);

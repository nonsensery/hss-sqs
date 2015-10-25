var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var fs = require('fs');

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

gulp.task('assemble', function () {
  var parts = [
    '<script>\n',
    fs.readFileSync('dist/product-page-custom.js'),
    '</script><style type="text/css">\n',
    fs.readFileSync('dist/product-page-custom.css'),
    '</style>\n'
  ];

  fs.writeFileSync('dist/final.html', parts.join(''));
});

gulp.task('default', ['js', 'css']);

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['js']);
  gulp.watch('src/*.scss', ['css']);
});

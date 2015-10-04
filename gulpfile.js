var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
  gulp.src('src/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
});

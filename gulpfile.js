var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var shell = require('gulp-shell');
var ghPages = require('gulp-gh-pages');

 
gulp.task('webserver', function() {
  connect.server({
    root: 'public'
  });
});


gulp.task('patternlabWatch', shell.task([
  'php core/builder.php -wr'
]))


gulp.task('sass', function () {
  gulp.src('./source/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./source/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./source/sass/*.scss','./source/sass/**/*.scss'], ['sass']);
});


gulp.task('publish', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

 
gulp.task('default', ['webserver', 'patternlabWatch','sass:watch']);

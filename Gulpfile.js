var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(plugins['gh-pages']());
});

gulp.task('clean', function () {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(plugins.connect.reload());
});

gulp.task('watch', function() {
  console.log('watching');
  gulp.watch('index.html', ['html']);
});

gulp.task('serve', function(event) {
    plugins.connect.server({
        root: '.',
        port: 8080,
        livereload: true
    });
});

gulp.task('default', ['serve', 'watch']);


var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(plugins.ghPages({
      branch: 'master'
    }));
});

gulp.task('clean', function () {
  return gulp.src('dist', {
      read: false
    })
    .pipe(plugins.clean());
});

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.connect.reload());
});

gulp.task('sass', function () {
  return gulp.src('./styles/main.scss')
    .pipe(plugins.sass().on('error', plugins.sass.logError))
    .pipe(gulp.dest('dist/'))
    .pipe(plugins.connect.reload());
});

gulp.task('build', [
  'html',
  'sass'
]);

gulp.task('watch', function() {
  console.log('watching');
  gulp.watch('index.html', ['html']);
  gulp.watch('styles/main.scss', ['sass']);
});

gulp.task('serve', function(event) {
  plugins.connect.server({
      root: 'dist/',
      port: 8080,
      livereload: true
  });
});

gulp.task('default', function() {
  return plugins.runSequence('clean', ['html', 'sass'], ['serve', 'watch']);
});


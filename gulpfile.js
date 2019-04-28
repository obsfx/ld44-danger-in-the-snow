var gulp = require('gulp');  
var concat = require('gulp-concat');

var paths = [
  './src/*.js', 
  './src/**/*.js'
]

gulp.task( 'default', [ 'scripts' ], function () {
    gulp.watch(paths, function() {
      gulp.run('scripts');
  });
});

gulp.task('scripts', function() {
  gulp.src(paths)
    .pipe(concat('game.js'))
    .pipe(gulp.dest('./build/'))
});
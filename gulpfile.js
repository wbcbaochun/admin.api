var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    stylish = require('jshint-stylish');

var paths = {
    script: ['./**/*.js', '!node_modules/**/*.js', '!gulpfile.js']
};

// lint js sources based on .jshintrc ruleset
gulp.task('jsHint', function() {
    return gulp
        .src(paths.script)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .on('error', gutil.log);
});


// 启动监视
gulp.task('watch', function() {
    return watch(paths.script, function() {
        gulp.start(['jsHint']);
    });
});

gulp.task('server', function() {
    nodemon({
            script: 'app.js',
            ext: 'js',
            ignore: ['gulpfile.js']
        })
        .on('restart', function() {
            console.log('server restarted!')
        });
});


// 开发环境
gulp.task('default', ['jsHint', 'server', 'watch']);

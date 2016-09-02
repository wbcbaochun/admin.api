let gulp = require('gulp'),
    watch = require('gulp-watch'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    nodemon = require('gulp-nodemon'),
    stylish = require('jshint-stylish'),
    fs = require('fs');

let paths = {
    script: ['./**/*.js', '!node_modules/**/*.js', '!gulpfile.js']
};

let production = (process.env.NODE_ENV === 'production');

// create logs folder if not exist
let logDir = './logs';
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

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
            ignore: ['gulpfile.js'],
            exec: 'node --debug'
        })
        .on('restart', function() {
            console.log('server restarted!')
        });
});

function buildAll() {
    gulp.start(['jsHint', 'server', 'watch']);
}

// 打包 -- 开发环境
gulp.task('default', function(cb) {
    process.env.NODE_ENV = 'development';
    buildAll();
});

// 打包 -- 测试环境
gulp.task('test', function(cb) {
    process.env.NODE_ENV = 'test';
    buildAll();
});
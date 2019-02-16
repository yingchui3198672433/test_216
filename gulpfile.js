/*
 * @Author: ZXY 
 * @Date: 2019-02-16 09:01:35 
 * @Last Modified by: ZXY
 * @Last Modified time: 2019-02-16 09:48:11
 */

var gulp = require('gulp'),
    scss = require('gulp-sass'),
    minCss = require('gulp-clean-css'),
    minJs = require('gulp-uglify'),
    babel = require('gulp-babel'),
    server = require('gulp-webserver'),
    concat = require('gulp-concat');


//起服务
gulp.task('devServer', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            livereload: true
        }))
});

//在gulp中创建scss任务，进行scss文件编译，并且压缩css（10分
gulp.task('devScss', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(scss())
        .pipe(minCss())
        .pipe(gulp.dest('./src/css'))
});

// 6.在gulp中创建js任务编译js文件，合并js，并且压缩（10分）；
gulp.task('devJs', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('all.js'))
        .pipe(minJs())
        .pipe(gulp.dest('./dist/js'))
});

// 7.在gulp中创建watch任务，进行js，css文件监听，自动执行对应的任务（10分）；
gulp.task('watch', function() {
    return gulp.watch('./src/', gulp.series('devScss', 'devJs'))
});

// 在gulp中创建default任务，默认执行browserSync服务，js，css，watch任务
gulp.task('default', gulp.series('devScss', 'devJs', 'devServer', 'watch'));

// 9.在gulp中创建build任务，指向js,css任务，并把文件生成到dist文件夹（10分）；
gulp.task('build', function() {
    return gulp.src('./.src/{css,js}/**/**.{css,js}')
        .pipe(gulp.dest('./build/{css,js}/**/*.{css,js}'))
});
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var runSequence = require('run-sequence');
var tsc = require('gulp-typescript');

var paths = {
    dist: './dist',
    sourceFiles: ['./src/**/*.ts'],
    toDelete: ['./dist/src','./dist/test', './dist/app'],
    distSourcesFiles: ['./dist/src/*']
};

gulp.task('clean', function () {
    return gulp.src(paths.dist, {read: false}).pipe(rimraf({force: true}));
});

gulp.task('tsc', function () {
    var tsProject = tsc.createProject('tsconfig.json', {outDir:"dist",declaration:true});
    var tsResult = tsProject.src().pipe(tsc(tsProject));
    tsResult.pipe(gulp.dest(paths.dist));
    return tsResult.dts.pipe(gulp.dest(paths.dist));
});

gulp.task('copyToDist', function(){
    return gulp.src("dist/src/*").pipe(gulp.dest(paths.dist));
});
gulp.task('cleanup', function () {
    return gulp.src(paths.toDelete, {read: false}).pipe(rimraf({force: true}));
});

// entry point - run tasks in a sequence
gulp.task('default', function (callback) {
    runSequence(
        'clean',
        'tsc',
        'copyToDist',
        'cleanup',
        function (error) {
            if (error) {
                console.log(error.message);
            } else {
                console.log('FINISHED SUCCESSFULLY');
            }
            callback(error);
        });
});

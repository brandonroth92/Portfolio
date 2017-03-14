var gulp = require('gulp');

var pug = require('gulp-pug');
var eslint = require('gulp-eslint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var clean = require('gulp-clean');
var cleanCSS = require('gulp-clean-css');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var mocha = require('gulp-mocha');

var baseDirs = {
  app: './',
  dist: './dist'
};

var publicDirs = {
  _self: 'public/',
  js: 'public/js/',
  css: 'public/css/',
  img: 'public/img/'
};

var bowerComponentsDir = baseDirs.app + 'public/libs/';

var appFiles = {
  js: [bowerComponentsDir + '**/*.min.js', baseDirs.app + publicDirs.js + '**/*.js'],
  css: [bowerComponentsDir + '**/*.min.css', baseDirs.app + publicDirs.css + '**/*.css'],
  index: [baseDirs.app + 'public/views/rendered/index.html']  
};

var concatFilenames = {
  js: 'bundle.js',
  css: 'bundle.css'
};

gulp.task('clean', function () {
  return gulp.src(baseDirs.dist, {read: false})
    .pipe(clean());
});

gulp.task('views', function buildHTML() {
  return gulp.src(baseDirs.app + 'public/views/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest(baseDirs.app + 'public/views/rendered'));
});

gulp.task('concat-js', function () {
  return gulp.src(appFiles.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(baseDirs.app + publicDirs.js));
});

gulp.task('concat-css', function () {
  return gulp.src(appFiles.css)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(baseDirs.app + publicDirs.css));
});

gulp.task('minify-js', function () {
  pump([
    gulp.src(baseDirs.app + publicDirs.js + 'bundle.js'),
    uglify(),
    gulp.dest(baseDirs.dist + publicDirs.js)
  ]);
});
   
gulp.task('minify-css', function () {
  return gulp.src(baseDirs.app + publicDirs.css + 'bundle.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(baseDirs.dist + publicDirs.css));
});
  
gulp.task('nodemon', function () {
  nodemon({
    script: 'server.js',
    ext: 'js pug css',
    ignore: [
      baseDirs.app + 'public/libs'
    ]
  })
  .on('restart', function () {
    console.log('Restarted - nodemon');
  });
});
  
gulp.task('watch', function () {
  gulp.watch(baseDirs.app + 'public/views/*.pug', ['views']);
});

gulp.task('test', function () {
  return gulp.src(baseDirs.app + 'test/test.js')
    .pipe(mocha());
});

// separate watch task for test since test starts new server connection on port 8080
gulp.task('watch-test', function () {
  gulp.watch(['*.js', 'app/**/*.js', 'config/*.js', 'test/*.js'], ['test']);
});

gulp.task('lint', function () {
  return gulp.src('**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});  
  
// gulp.task('default', ['concat-js', 'concat-css', 'nodemon', 'watch']);
gulp.task('default', ['nodemon', 'watch']);
gulp.task('dist', ['concat-js', 'concat-css', 'minify-js', 'minify-css']);
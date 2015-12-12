var gulp = require('gulp')
var jade = require('gulp-jade')
var sass = require('gulp-sass')
var gutil = require('gulp-util')
var source = require('vinyl-source-stream')
var connect = require('gulp-connect')
var livereload = require('gulp-livereload')
var babelify = require('babelify')
var watchify = require('watchify')
var browserify = require('browserify')


var clientRoot = 'static'
var sourceRoot = 'frontend-src'
var paths = {
  src: {
    jade: `${sourceRoot}/jade/**/*`,
    scss: `${sourceRoot}/**/*`,
    js: `${sourceRoot}/js/**/*`,
    //res: `'assets/**/*'
  },
  dst: {
    html: `${clientRoot}`,
    css: `${clientRoot}/css`,
    js: `${clientRoot}/js`,
    //res: `${clientRoot}/assets`
  }
}

gulp.task('jade', () => {
  gulp.src(`${sourceRoot}/jade/index.jade`)
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(paths.dst.html))
    .pipe(livereload())
})

// gulp.task('resources', () => {
//   gulp.src(paths.src.res)
//     .pipe(gulp.dest(paths.dst.res))
//     .pipe(livereload())
// })

gulp.task('scss', () => {
  gulp.src(`${sourceRoot}/scss/main.scss`)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dst.css))
    .pipe(livereload())
})

var bundler = browserify({
  transform: [babelify],
  extensions: ['.js', '.jsx'],
  debug: true,
  cache: {},
  packageCache: {},
  fullPaths: true
})


gulp.task('js', () => {
  bundler
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('app.js'))
    .pipe(gulp.dest(paths.dst.js), {entries: [`${sourceRoot}/js/main`]})
})

gulp.task('watch', () => {
  gulp.watch(paths.src.jade, ['jade'])
  gulp.watch(paths.src.scss, ['scss'])
  var bundler = browserify({
    entries: [`${sourceRoot}/js/main`],
    transform: [babelify],
    extensions: ['.js', '.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  })
  var wundler = watchify(bundler, {poll: 100})
  function build (file) {
    if (file) gutil.log('Recompiling ' + file)
    wundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('app.js'))
      .pipe(gulp.dest(paths.dst.js))
      .pipe(livereload())
  }

  build()
  wundler.on('update', build)

  livereload.listen();
})

gulp.task('build', [
  //'resources',
  'jade',
  'scss',
  'js'
])

gulp.task('webserver', () => {
  connect.server({
    port: 8000,
    livereload: true
  })
})

gulp.task('default', [
  'build',
  'watch',
  'webserver'
])

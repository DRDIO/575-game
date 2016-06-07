var path = require('path')
var gulp = require('gulp')
var series = require('stream-series')
var clean = require('gulp-clean')
var less = require('gulp-less')
var cssmin = require('gulp-cssmin')
var livereload = require('gulp-livereload')
var templateCache = require('gulp-angular-templatecache')
var angularFilesort = require('gulp-angular-filesort')
var inject = require('gulp-inject')

var vendorList = [
  './node_modules/socket.io-client/socket.io.js',
  './node_modules/angular/angular.js',
  './node_modules/@angular/router/angular1/angular_1_router.js',
  './node_modules/angular-sanitize/angular-sanitize.js',
  './node_modules/mobile-angular-ui/dist/js/mobile-angular-ui.js',
  './node_modules/mobile-angular-ui/dist/js/mobile-angular-ui.gestures.js',
  './node_modules/mobile-angular-ui/dist/css/mobile-angular-ui-base.css',
  './node_modules/mobile-angular-ui/dist/css/mobile-angular-ui-hover.css',
  './node_modules/mobile-angular-ui/dist/css/mobile-angular-ui-desktop.css',
  './node_modules/mobile-angular-ui/dist/fonts/**'
]

gulp.task('clean', () => {
  return gulp.src(['./www/js', './www/lib', './www/*.css'], { read: false }).pipe(clean())
})

gulp.task('less', ['clean'], () => {
  return gulp.src('./client/less/index.less')
    .pipe(less())
    .pipe(cssmin())
    .pipe(gulp.dest('./www'))
})

gulp.task('app', ['clean', 'less'], () => {
  var templateStream = gulp.src('./client/**/*.html')
    .pipe(templateCache({ module: '575-game' }))
    .pipe(gulp.dest('./www/js'))

  var vendorStream = gulp.src(vendorList, { base: './node_modules' })
    .pipe(gulp.dest('./www/lib'))

  var appStream = gulp.src(['./client/**/*.js'])
    .pipe(gulp.dest('./www/js'))
    .pipe(angularFilesort())

  return gulp.src('./www/index.html')
    .pipe(inject(series(vendorStream, appStream, templateStream), { relative: true }))
    .pipe(gulp.dest('./www'))
})

gulp.task('watch', () => {
  livereload.listen()
  gulp.watch('./client/app/**/*', ['app'])
  gulp.watch('./client/less**/*', ['less'])
})

gulp.task('default', ['clean', 'less', 'app', 'watch'])

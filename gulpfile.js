var gulp = require('gulp'),
  premailer = require('gulp-premailer'),
  sass = require('gulp-ruby-sass'),
  litmus = require('gulp-litmus');

var litmusConfig = {
  username: 'you@example.com',
  password: 'password',
  url: 'https://account.litmus.com',
  applications: [
    'applemail6',
    'gmailnew',
    'ffgmailnew',
    'chromegmailnew',
    'iphone5',
  ],
};

/**
 * Compile all SCSS files to CSS and copy to ./css and ./build/css
 **/
gulp.task('sass', () => {
  return sass('sass/*.scss')
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest('./css'))
    .pipe(gulp.dest('./build/css'));
});

/**
 * Place all CSS inline and copy html files to build/
 **/
gulp.task('inline', ['sass'], () => {
  return gulp.src(['./*.html', './build/*.html'])
    .pipe(premailer())
    .pipe(gulp.dest('./build'));
});

/**
 * Compile all of the SASS and html
 **/
gulp.task('build', ['inline']);

/**
 * Submit your tests to Litmus
 **/
gulp.task('test', () => {
  return gulp.src('./build/*.html')
    .pipe(litmus(litmusConfig));
});

/**
 * Watch all changed files and perform its respective action
 **/
gulp.task('watch', () => {
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('./*.h*ml', ['inline']);
});

const { src, dest, series, parallel } = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

// Percorsi
const paths = {
  html: 'src/*.html',
  css: 'src/*.css',
  js: 'src/**/*.js',    // tutti i JS in src e sottocartelle
  img: 'src/img/**/*',
  dest: 'docs'
};

// Minimizza HTML
function minifyHTML() {
  return src(paths.html)
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest(paths.dest));
}

// Minimizza CSS
function minifyCSS() {
  return src(paths.css)
    .pipe(cleanCSS())
    .pipe(dest(paths.dest));
}

// Minifica JS mantenendo la struttura delle cartelle
function minifyJS() {
  return src(paths.js, { base: 'src' })   // base mantiene la struttura originale
    .pipe(uglify())
    .pipe(dest(paths.dest));
}

// Task principale
exports.build = series(
  parallel(minifyHTML, minifyCSS, minifyJS)
);
exports.default = exports.build;

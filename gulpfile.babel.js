import gulp from 'gulp';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import imagemin from 'gulp-imagemin';
import cleanCSS from 'gulp-clean-css';
import pug from 'gulp-pug';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
//import jsdoc from 'gulp-jsdoc3';
import del from 'del';

const server = browserSync.create();
const docs = browserSync.create()
// paths
const paths = {
  styles: {
    src: 'source/assets/sass/**/*.sass',
    dest: 'dist/assets/styles/',
  },
  scripts: {
    src: 'source/assets/js/**/*.js',
    dest: 'dist/assets/scripts/',
  },
  images: {
    src: 'source/assets/images/**/*.{jpg,jpeg,png}',
    dest: 'dist/assets/img/',
  },
  views: {
    src: 'source/template/**/*.pug',
    dest: 'dist',
  }
};

function reload(done) {
  server.reload();
  done();
}

// function docReload(done) {
//   docs.reload();
//   done();
// }
function copy() {
  return (
    gulp
    .src('node_modules/startbootstrap-sb-admin-2/vendor/**/*.*')
    .pipe(gulp.dest('dist/assets/vendor/')))
}

function serve(done) {
  server.init({
    port: 5500,
    server: './dist',
    ui: {
      port: 5800,
    },
  });

  // docs.init({
  //   notify: true,
  //   port: 9090,
  //   ui: {
  //     port: 9090
  //   },
  //   server: {
  //     baseDir: ['./docs/'],
  //     index: 'index.html',
  //     directory: false,
  //   }
  // });
  watchFiles();
  done();
}
/*
 * For small tasks you can export arrow functions
 */
export const clean = () => del(['dist']);

// function doc(cb) {
//   const config = require('./jsdoc.json');
//   gulp
//     .src(['README.md', './source/assets/js/**/*.js'], {
//       read: true,
//     })
//     .pipe(jsdoc(config, cb));
// }
/*
 * You can also declare named functions and export them as tasks
 */
export function styles() {
  return (
    gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(
      rename({
        basename: 'main',
        suffix: '.min',
      }),
    )
    .pipe(server.stream())

    .pipe(gulp.dest(paths.styles.dest))
  );
}

export function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(babel())
    //.pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(server.stream())

    .pipe(gulp.dest(paths.scripts.dest));
}

function views() {
  return gulp
    .src(paths.views.src)
    .pipe(plumber())
    .pipe(
      pug({
        pretty: true,
      }),
    )
    .pipe(server.stream())

    .pipe(gulp.dest(paths.views.dest));
}

function images() {
  return gulp
    .src(paths.images.src, {
      since: gulp.lastRun(images),
    })
    .pipe(
      imagemin({
        optimizationLevel: 5,
      }),
    )
    .pipe(gulp.dest(paths.images.dest));
}
/*
 * You could even use `export as` to rename exported tasks
 */
function watchFiles() {
  gulp.watch(paths.scripts.src, gulp.series(scripts, reload));
  // gulp.watch([paths.jsDoc.src, paths.jsDoc.read], gulp.series(docReload, doc));
  gulp.watch(paths.views.src, gulp.series(views, reload));
  gulp.watch(paths.styles.src, gulp.series(styles, reload));
  gulp.watch(paths.images.src, gulp.series(images, reload));
}
export {
  watchFiles as watch,
};

const build = gulp.series(
  clean,
  views,
  copy,
  gulp.parallel(styles, scripts),
  images,
  serve,
);
/*
 * Export a default task
 */
export default build;

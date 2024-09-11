const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const twig = require('gulp-twig');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const w3cjs = require('gulp-w3cjs');
const accessibility = require('gulp-accessibility');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// ... autres tâches inchangées ...




// Compilation Sass
gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest('dist/css'));
});

// Compilation Twig
gulp.task('twig', () => {
  return gulp.src('src/twig/*.twig')
    .pipe(twig())
    .pipe(gulp.dest('dist'));
});

// Traitement JavaScript
gulp.task('js', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Validation W3C
gulp.task('w3c', () => {
  return gulp.src('dist/**/*.html')
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
});

// Vérification d'accessibilité mise à jour
gulp.task('accessibility', () => {
    return gulp.src('dist/**/*.html')
      .pipe(accessibility({
        accessibilityLevel: 'WCAG2AA',
        reportLevels: {
          notice: false,
          warning: true,
          error: true
        },
        force: true
      }))
      .on('error', function(err) {
        console.log('Gulp Accessibility Error:', err.message);
        this.emit('end');
      })
      .pipe(accessibility.report({reportType: 'txt'}))
      .pipe(gulp.dest('accessibility-reports'));
  });
  
    // Tâche par défaut
    gulp.task('tests', gulp.series( 'accessibility','w3c'));

// Watch / Tâche par défaut
gulp.task('default', () => {
  gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
  gulp.watch('src/twig/**/*.twig', gulp.series('twig',"w3c","accessibility"));
  gulp.watch('src/js/**/*.js', gulp.series('js'));
});
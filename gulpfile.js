const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const twig = require('gulp-twig');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const accessibility = require('gulp-accessibility');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const through2 = require('through2');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

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

// Nouvelle tâche w3c
gulp.task('w3c', () => {
    return gulp.src('dist/**/*.html')
      .pipe(through2.obj(function(file, enc, cb) {
        const contents = file.contents.toString();
        const fileName = path.basename(file.path);
        
        console.log(`Validating: ${fileName}`);
        
        fetch('https://validator.w3.org/nu/?out=json', {
          method: 'POST',
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
          body: contents
        })
        .then(response => response.json())
        .then(data => {
          const errors = data.messages.filter(msg => msg.type === 'error');
          const warnings = data.messages.filter(msg => msg.type === 'info');
          
          console.log(`Results for ${fileName}:`);
          console.log(`Errors: ${errors.length}`);
          console.log(`Warnings: ${warnings.length}`);
          
          if (errors.length > 0 || warnings.length > 0) {
            console.log('Details:');
            data.messages.forEach(msg => {
              console.log(`- Line ${msg.lastLine}: ${msg.message}`);
            });
          }
          
          // Écrire les résultats dans un fichier
          const reportPath = path.join('w3c-reports', `${fileName}.json`);
          fs.mkdirSync('w3c-reports', { recursive: true });
          fs.writeFileSync(reportPath, JSON.stringify(data, null, 2));
          
          console.log(`Full report saved to: ${reportPath}`);
          console.log('-------------------');
        })
        .catch(error => console.error('Validation error:', error))
        .finally(() => cb(null, file));
      }));
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

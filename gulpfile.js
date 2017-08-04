var gulp = require('gulp');
var replace = require('gulp-replace');

gulp.task('svg-sprites', function () {
  return gulp.src([
    'node_modules/material-design-icons/sprites/svg-sprite/*.svg',
    '!node_modules/material-design-icons/sprites/svg-sprite/*-symbol.svg',
  ])
    // make id nice
    .pipe(replace(/id=\"ic_([0-9a-zA-z_]+)_24px\"/g, function (pattern, replacement) {
      var out = replacement.replace(/_/g, '-');
      return 'id="' + out + '"';
    }))
    // remove xml header
    .pipe(replace(/<\?xml.+\?>/g, ''))
    // remove attributes
    .pipe(replace(/(width|height|viewBox|xmlns|xmlns\:xlink|x|y)=\"[^\"]*\"\ ?/g, ''))
    // wrap inner svgs into defs
    .pipe(replace(/(<svg[^>]*>)(.*)(<\/svg>)/, '$1<defs>$2</defs>$3'))
    // trim white space
    .pipe(replace(/\ >/g, '>'))
    .pipe(gulp.dest('dist'));
});

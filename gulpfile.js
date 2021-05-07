const {
    src,
    dest,
    parallel,
    series,
    watch
  } = require('gulp');
  
  const browserSync = require('browser-sync').create();
  const concat = require('gulp-concat');
  const uglify = require('gulp-uglify-es').default;
  const scss = require('gulp-sass');
  const autoprefixer = require('gulp-autoprefixer');
  const imagemin = require('gulp-imagemin');
  const newer = require('gulp-newer');
  const del = require('del');
  
  
  function browsersync() {
	browserSync.init({ // Инициализация Browsersync
		server: { baseDir: 'app/' }, // Указываем папку сервера
		notify: false, // Отключаем уведомления
		online: true // Режим работы: true или false
	})
}
  
  
  function scripts() {
    return src([ // Берём файлы из источников
          'app/js/jquery.js',
          'app/js/swiper-bundle.min.js',
          'app/js/js.js'
      ])
    .pipe(concat('js.min.js')) // Конкатенируем в один файл
    .pipe(uglify()) // Сжимаем JavaScript
    .pipe(dest('app/js/')) // Выгружаем готовый файл в папку назначения
    .pipe(browserSync.stream()) // Триггерим Browsersync для обновления страницы
  }
  
  
  function styles() {
    return src([
        'app/scss/**/*.scss'
      ])
      .pipe(scss({
        outputStyle: "compact"
      }))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        grid: true
      }))
      .pipe(dest('app/css/'))
      .pipe(browserSync.stream())
  }
  
  
  function img() {
    return src('images/**/*')
      .pipe(newer('app/img/'))
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{
          removeViewBox: false
        }],
        interlaced: true,
        optimizationLevel: 3 // 0 to 7
      }))
      .pipe(dest('app/img/'))
  }
  
  
  function cleanImg() {
    return del('images/**/*', {
      force: true
    })
  }
  
  
  function cleanBuild() {
    return del([
      'build/**/*',
      'build/.htaccess'
    ], {
      force: true
    })
  }
  
  
  function buildCopy() {
    return src([
        'app/css/**/*',
        'app/fonts/**/*',
        'app/js/**/*',
        'app/img/**/*',
        'app/video/**/*',
        'app/**/*.html',
        'app/**/*.php',
        'app/.htaccess',
        'app/**/*.txt'
      ], {
        base: 'app'
      })
      .pipe(dest('build'));
  }
  
  
  function startWatch() {
    watch(['app/scss/**/*.scss'], styles)
    watch(['app/**/*.js', '!app/**/*.min.js'], scripts)
    watch('app/**/*.php').on('change', browserSync.reload)
    watch('app/**/*.html').on('change', browserSync.reload)
    watch('images/**/*', img)
  }
  
  
  exports.browsersync = browsersync;
  exports.scripts = scripts;
  exports.styles = styles;
  exports.img = img;
  exports.cleanImg = cleanImg;
  exports.cleanBuild = cleanBuild;
  exports.build = series(cleanBuild, styles, scripts, img, buildCopy);
  
  exports.default = parallel(styles, scripts, img, browsersync, startWatch);
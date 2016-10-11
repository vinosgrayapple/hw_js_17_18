var gulp 		= require('gulp'),
	browserSync = require('browser-sync'),
	sass        = require('gulp-sass'),
	concat      = require('gulp-concat'),
	uglify		= require('gulp-uglifyjs'),
	cssnano 	= require('gulp-cssnano'),
	rename      = require('gulp-rename'),
	del        = require('del');

	gulp.task('sass', function() {
		return gulp.src('app/sass/**/*.sass')
					.pipe(sass())
					.pipe(gulp.dest('app/css'))
					.pipe(browserSync.reload({stream: true}))
	});

gulp.task('browser-sync', function() {
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify:false
	});

});
gulp.task('scripts', function() {
	return gulp.src(['app/libs/jquery/dist/jquery.min.js',
						'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js'])
				.pipe(concat('libs.min.js'))
				.pipe(uglify())
				.pipe(gulp.dest('app/js'));
});
gulp.task('css-libs', ['sass'], function() {
	return gulp.src('app/css/libs.css')
				.pipe(cssnano())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('app/css'));
});
	gulp.task('default', ['browser-sync', 'css-libs', 'scripts'], function() {
		gulp.watch('app/sass/**/**.sass', ['sass']);
		gulp.watch('app/**/**.html', browserSync.reload);
		gulp.watch('app/js/**/**.js', browserSync.reload);

	});
gulp.task('clean', function() {
    return del.sync('dist'); 
});

gulp.task('build',['clean','sass', 'scripts'], function() {
	var buildCss 	= gulp.src(['app/css/style.css', 'app/css/libs.min.css'])
				.pipe(gulp.dest('dist/css'));
	var buildJs 	= gulp.src('app/js/**/*') 
    			.pipe(gulp.dest('dist/js'))

    var buildHtml 	= gulp.src('app/*.html') 
    			.pipe(gulp.dest('dist'));

});

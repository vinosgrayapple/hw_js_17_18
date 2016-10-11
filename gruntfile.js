module.exports = function(grunt) {

grunt.initConfig({
  concat: {
    options: {
      separator: ';',
    },
    dist: {
      src: ['js/**/*.js'],
      dest: 'dist/js/script.main.js',
    },
  },
   uglify: {
    my_target: {
      files: {
        'dist/js/script.main.min.js': ['dist/js/*.js']
      }
    }
  }
});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'uglify']);
};

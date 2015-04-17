(function() {
	"use strict";

	module.exports = function(grunt) {
		grunt.initConfig({
			jshint: {
				all: ['Gruntfile.js', 'index.js', 'src/**/*.js']
			},
			concat: {
				options: {
					seperator: ';'
				},
				dist: {
					src: ['src/**/*.js'],
					dest: 'dist/awesome-ui.js'
				}
			},
			uglify: {
		      target: {
		        files: {
		          './dist/js/awesome-ui.min.js': ['./dist/awesome-ui.js']
		        }
		      }
		    },
			watch: {
				all: {
					files: ['*.js', '**/*.js'],
					tasks: ['jshint', 'concat']
				}
			}
		});

		// Load the plugins that the tasks use
		grunt.loadNpmTasks('grunt-contrib-jshint');
		grunt.loadNpmTasks('grunt-contrib-concat');
		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-uglify');

		// Define tasks to be called to execute different configs
		grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	};
}());
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! build <%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %> */\n/*! percentage.js */\n/*! Copyright Francois Lajoie */\n/*! MIT License */\n'
      },
      my_target: {
        files: {
          'build/percentage.min.js': ['build/percentage.js']
        }
      }
    },

    copy: {
      build: {
        files: [
          {
            src:  'src/percentage.js',    // set working folder / root to copy
            dest: 'build/percentage.js',  // destination folder
          },
        ],
      },
    },

    watch: {
      scripts: {
        files: ['src/*.js'],
        tasks: ['default'],
        options: {
          spawn: false,
        },
      },

      tests: {
        files: ['build/percentage.js', 'tests/*.js'],
        tasks: ['tests'],
        options: {
          spawn: false,
        },
      },

    },

    qunit: {
      all: ['tests/*.html']
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task (AKA BUILD)
  grunt.registerTask('default', ['copy:build', 'uglify']);

  // Test task
  grunt.registerTask('tests', ['qunit']);

};
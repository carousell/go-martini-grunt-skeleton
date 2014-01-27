module.exports = function(grunt) {

  // Grunt configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
      html: 'dist/templates/**.tmpl',
      options: {
        dest: 'dist/public',
        root: 'public',
      }
    },

    usemin: {
      html: 'dist/templates/**.tmpl',
      options: {
        assetsDirs: ['dist/public',]
      }
    },

    // copy templates to dist folder for usemin to update
    copy: {
      templates: {
        files: [{expand:true, src:'templates/**.tmpl', dest: 'dist/'}]
      }
    },

    clean: ['dist', '.tmp'],

    less: {
      development: {
        options: {
          paths: ['public/css'],
          cleancss: true
        },
        files: {
          'public/css/base.css': 'public/css/base.less'
        },
      },
      production: {
        options: {
          paths: ['public/css'],
          cleancss: true
        },
        files: {
          'public/css/base.css': 'public/css/base.less'
        },
      },
    },

    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      summary: {
        src: 'dist/**/*.{css,js}'
      }
    },

    watch: {
      less: {
        files: ['public/css/*.less'],
        tasks: ['less:development',]
      },
      js: {
        files: ['public/js/*.js'],
        tasks: ['jshint',]
      }
    },

    shell: {
      go: {
        command: 'grunt watch & go run main.go',
        options: {
          stdout: true
        }
      },
      gofmt: {
        command: 'gofmt -w *.go',
        options: {
          stdout: true
        }
      }
    },

    jshint: {
        all: ['Gruntfile.js', 'public/js/**/*js',]
    }

  });

  // Load Grunt tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-filerev');

  // Run "grunt build" to concat+minify+revision CSS/JS files, update usemin
  // blocks in templates
  grunt.registerTask('build',[
    'jshint',
    'shell:gofmt',
    'clean',
    'copy:templates',  // copy templates to dist folder
    'less:production',
    'useminPrepare',   // prepare an object of files that will be passed to concat and/or uglify
    'concat',          // concatenate assets
    'uglify',        // minify JS files
    'cssmin',          // minify CSS files
    'filerev',
    'usemin',          // replace usemin blocks with actual filepaths
  ]);

  // Run "grunt" to start the go server and watch less files for recompilation
  grunt.registerTask('default',[
    'jshint',
    'shell:go',
  ]);

};

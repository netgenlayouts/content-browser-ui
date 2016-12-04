// Generated on 2013-07-23 using generator-webapp 0.2.6
'use strict';

var proxyMiddleware = require('http-proxy-middleware');

/* OVERRIDE HANDLEBARS DEFAULT NAME LOOKUP ========================================================================================================*/
var Handlebars = require('handlebars/lib/index');
var JavaScriptCompiler = Handlebars.JavaScriptCompiler;

var helpers = require('netgen-core/app/scripts/helpers');

var known_helpers = {};
for (var k in helpers) {
  known_helpers[k] = true;
}



JavaScriptCompiler.prototype.nameLookup = function(parent, name /* , type*/ ) {
  return "Handlebars.r(" + parent + ",'" + name + "')";
};

/* OVERRIDE HANDLEBARS DEFAULT NAME LOOKUP ========================================================================================================*/


// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var local_config = 'local_config.json';
  if(!grunt.file.exists(local_config)){
    grunt.file.copy(local_config+'.example', local_config)
    throw new Error('Please fill ' + local_config +' in directory of Gruntfile.js');
  }

  // configurable paths
  var config = {
    app: 'app',
    dist: 'bundle/Resources/public',
    dev: 'bundle/Resources/public/dev',
    local: grunt.file.readJSON(local_config)
  };

  grunt.initConfig({
    config: config,
    pkg: grunt.file.readJSON('package.json'),


    watch: {

      browserify_vendor: {
        files: ['node_modules/netgen-core/app/scripts/**/*.js'],
        tasks: ['browserify:vendor']
      },

      browserify: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['browserify:dev', 'browserify:demo']
      },
      sass: {
        files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'postcss:server']
      },
      handlebars: {
        files: ['<%= config.app %>/templates/**/*.hbs', 'tests/templates/**/*.hbs'],
        tasks: ['handlebars']
      }
    },

    browserSync: {
      bsFiles: {
        src: ['<%= config.dev %>/js/demo.js','<%= config.dev %>/styles/*.css', 'app/*html']
      },
      options: {

        open: false,
        watchTask: true,
        server: {
          middleware: [
            proxyMiddleware('/cb/', {target: 'http://'+config.local.domain +'/ngadminui/', changeOrigin: true, silent: true})
          ],
          baseDir: ['<%= config.dev %>', config.app, '.']
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dev %>',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/vendor',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '<%= config.dev %>'
    },


    handlebars: {
      compile: {
        files: {
          '<%= config.app %>/scripts/templates.js': '<%= config.app %>/templates/**/*.hbs'
        },
        options: {
          compilerOptions: {
            knownHelpers: known_helpers,
            knownHelpersOnly: true
          },
          commonjs: true,
          wrapped: true,
          processPartialName: function(filename) {
            return filename
              .replace(/^app\/templates\//, '')
              .replace(/_(\w+)\.hbs$/, '$1');
          },
          processName: function(filename) {
            // funky name processing here
            return filename
              .replace(/^app\/templates\//, '')
              .replace(/\.hbs$/, '');
          }
        }
      }
    },

    sass: {
      options: {
        includePaths: ['.']
      },
      server: {
        options: {
          sourceMap: true,
          sourceMapEmbed: true,
          sourceMapContents: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dev %>/styles',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          sourceMap: false,
          sourceMapEmbed: false,
          sourceMapContents: false,
          outputStyle: 'compressed'
        },
        files: [{
          expand: true,
          cwd: '<%= config.app %>/styles',
          src: ['*.{scss,sass}'],
          dest: '<%= config.dist %>/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: 'last 3 versions'})
        ]
      },
      server: {
        src: '<%= config.dev %>/styles/*.css'
      },

      dist: {
        src: '<%= config.dist %>/css/*.css'
      }
    },

    browserify: {
      vendor: {
        src: [],
        dest: '<%= config.dev %>/js/vendor.js',
        options: {
          // require: ['netgen-core'],
          browserifyOptions: {
            // debug: true
          }
        }
      },
      dev: {
        src: ['<%= config.app %>/scripts/main.js'],
        dest: '<%= config.dev %>/js/main.js',
        options: {
          // external: ['netgen-core'],
          browserifyOptions: {
            debug: true
          },
          alias: {
            'netgen-content-browser': './app/scripts/views/browser'
          }
        },
      },

      demo: {
        src: ['<%= config.app %>/scripts/demo.js'],
        dest: '<%= config.dev %>/js/demo.js',
        options: {
          // external: ['netgen-core'],
          browserifyOptions: {
            debug: true
          },
          alias: {
            'netgen-content-browser': './app/scripts/views/browser'
          }
        },
      },

      dist: {
        src: ['<%= config.app %>/scripts/main.js'],
        dest: '<%= config.dist %>/js/<%= pkg.name %>.js',
        options: {
          require: ['netgen-core'],
          alias: {
            'netgen-content-browser': './app/scripts/views/browser'
          }
        },
      }

    },


    uglify: {
      dist: {
        options: {
          compress: {
            drop_console: true
          }
        },
        src: '<%= config.dist %>/js/<%= pkg.name %>.js',
        dest: '<%= config.dist %>/js/<%= pkg.name %>.js'
      }
    },


    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },



    // Put files not handled in other tasks here
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'images/{,*/}*.{webp,gif}',
            'fonts/**/{,*/}*.{eot,svg,ttf,woff,woff2}'
          ]
        }, {
          expand: true,
          cwd: '<%= config.dev %>/images',
          dest: '<%= config.dist %>/images',
          src: [
            'generated/*'
          ]
        }]
      }
    },


    concurrent: {
      server: [
        'sass:server',
        'browserify:vendor',
        'browserify:demo'
      ],
      test: [

      ],
      dist: [
        'handlebars',
        'browserify:dist',
        'sass:dist',
        'imagemin',
        'svgmin'
      ]
    },



  });

  grunt.registerTask('server', function() {
    grunt.task.run([
      'fast_build',
      'browserSync',
      'watch'
    ]);
  });

  grunt.registerTask('fast_build', function() {
    grunt.task.run([
      'clean:server',
      'handlebars',
      'concurrent:server',
      'postcss:server'
    ]);
  });


  grunt.registerTask('build', function() {
    grunt.task.run([
      'clean:dist',
      'gitinfo',
      'concurrent:dist',
      'postcss:dist',
      'uglify',
      'copy:dist'
    ]);

  });



  grunt.registerTask('default', ['server']);

};

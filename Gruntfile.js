/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    conf: grunt.file.readJSON('config.json'),
    // 清理目标目录
    clean: {
      all: ['dist/**','.tmp/**']
    },
    // 将html及图片拷贝至目标目录
    copy: {
      src: {
        files: [
          {expand: true, cwd: 'app/views', src: ['**/*.html'], dest: 'dist/views'}
        ]
      },
      image: {
        files: [
          {expand: true, cwd: 'app/images', src: ['*.{png,jpg,jpeg,gif}'], dest: 'dist/images'}
        ]
      }
    },
    useminPrepare: {
      html: 'dist/views/**/*.html'
    },
    bower: {
     install: { 
      "options": {
          "targetDir": "./app/libs",
          "layout": "byComponent",
          "install": true,
          "verbose": false,
          "cleanTargetDir": false
        }
      }
    },
    concat: {
      options: {
        process: function(src, filepath) {
          return "function sss(){" + src + "}";
        }
      },
      generated:{
        files:{
          '.tmp/concat/js/home/home.js' :['app/controller/home/*.js'],
          '.tmp/concat/js/libs.js'      :['app/libs/**/*.js'],
          '.tmp/concat/css/libs.css'    :['app/libs/**/*.css']
        }
      }
    },
    uglify: {
      generated: {
        files: [{
          expand:true,
          cwd:'.tmp/concat/js',//js目录下
          src:'**/*.js',//所有js文件
          dest: 'dist/js'//输出到此目录下
        }]
      }
    },
    cssmin: {
      prod: {
        options: {
          report: 'gzip'
        },
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css'],
          dest: 'dist/css'
        }]
      }
    },
    usemin: {
      html: 'dist/views/**/*.html',
      options: {
        root:'app',
        dest:'dist'
      }
    },
    htmlmin: {
      options: {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true
      },
      html: {
        files: [
          {expand: true, cwd: 'dist/views', src: ['**/*.html'], dest: 'dist/views'}
        ]
      }
    },
    connect: {
      dev: {
        options: {
          hostname:'localhost',
          port: 9001,
          livereload: 35728,
          base:['app','app/views'],
          middleware: require('./lib/middleware')
        },
        proxies: [{
          context: '/data',
          host: 'localhost',
          changeOrigin: true,
          port: 80
        }]
      }
    },
    watch:{
      html:{
        files:['app/views/**/*.html'],
        options: {livereload:35728}
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-livereload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-connect-proxy');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-bower-task');
  // Default task.
  grunt.registerTask('default', [
    'clean', 
    'copy',
    'bower', 
    // 'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'cssmin',
    'usemin',
    'htmlmin'
  ]);
  grunt.registerTask('dev', [
    'bower',
    'configureProxies:dev',
    'connect:dev',
    'watch'
  ]);
};
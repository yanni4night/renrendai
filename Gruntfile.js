/**
 * Copyright (C) 2014 yanni4night.com
 * Gruntfile.js
 *
 * changelog
 * 2014-08-01[18:41:37]:authorized
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */

var swig = require('swig');
swig.setDefaults({
    varControls: ['<{', '}>'],
    cache: false,
    loader: swig.loaders.fs(__dirname + '/template')
});

module.exports = function(grunt) {

    var BUILD = "build/";
    var TPL = "template/";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            fonts:{
                src:['static/fonts/*.woff'],
                dest:BUILD
            },
            img:{
                expand:true,
                cwd:'.',
                src:['static/img/**/*.{gif,png,jpg,jpeg}'],
                dest:BUILD
            }
        },
        cssmin:{
            css:{
                expand:true,
                cwd:'.',
                src:['static/**/*.css'],
                dest:BUILD
            }
        },
        clean: {
            all:[BUILD]
        },
        stamp: {
            options:{
                baseDir:BUILD,
                ignoreMissing:false
            },
            html:{
                expand:true,
                cwd:BUILD,
                src:['static/css/**/*.css'],
                dest:BUILD
            },
            css:{
                expand:true,
                cwd:BUILD,
                src:['template/**/*.html'],
                dest:BUILD
            }
        },
        uglify: {
            js:{
                expand:true,
                cwd:'.',
                src:['static/js/**/*.js'],
                dest:BUILD
            }
        },
        swig: {
            all: {
                expand: true,
                cwd: TPL,
                src: ['**/*.html'],
                dest: BUILD + TPL
            }
        }
    });

    grunt.registerMultiTask('swig', 'render', function() {
        this.files.forEach(function(f) {
            var src = f.src[0].replace(TPL,'');
            grunt.file.write(f.dest,swig.renderFile(src,{}));
            grunt.log.ok(f.dest);
        });
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-yui-compressor');//cssmin cannot handle csshack
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-web-stamp');

    grunt.registerTask('default', ['clean','copy','cssmin','uglify','swig','stamp']);
};
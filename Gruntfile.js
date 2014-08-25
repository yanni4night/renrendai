/**
 * Copyright (C) 2014 yanni4night.com
 * Gruntfile.js
 *
 * changelog
 * 2014-08-01[18:41:37]:authorized
 * 2014-08-03[17:09:39]:velocity supported
 *
 * @author yanni4night@gmail.com
 * @version 0.1.1
 * @since 0.1.0
 */

var swig = require('swig');
swig.setDefaults({
    varControls: ['<{', '}>'],
    cache: false,
    loader: swig.loaders.fs(__dirname + '/template')
});

module.exports = function(grunt) {
    var SVN = "../duonet/p2p-duonet-web/src/main/webapp/";
    var SVN_STATIC = SVN;
    var SVN_VM = SVN + "WEB-INF/vm/";
    var BUILD = "build/";
    var TPL = "template/";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            fonts: {
                src: ['static/fonts/*.woff', 'static/misc/*'],
                dest: BUILD
            },
            img: {
                expand: true,
                cwd: '.',
                src: ['static/**/*.{gif,png,jpg,jpeg}'],
                dest: BUILD
            },
            js: {
                expand: true,
                cwd: '.',
                src: ['static/**/*.js'],
                dest: BUILD
            },
            pub_static: {
                expand: true,
                cwd: BUILD,
                src: ['static/**/*'],
                dest: SVN_STATIC
            },
            pub_vm: {
                expand: true,
                cwd: BUILD + TPL,
                src: ['**/*.vm'],
                dest: SVN_VM
            }
        },
        cssmin: {
            css: {
                expand: true,
                cwd: '.',
                src: ['static/**/*.css'],
                dest: BUILD
            }
        },
        clean: {
            all: [BUILD]
        },
        stamp: {
            options: {
                baseDir: BUILD,
                stampName: 'dn',
                ignoreMissing: true
            },
            html: {
                expand: true,
                cwd: BUILD,
                src: ['static/**/*.css'],
                dest: BUILD
            },
            css: {
                expand: true,
                cwd: BUILD,
                src: ['template/**/*.vm'],
                dest: BUILD
            }
        },
        uglify: {
            options: {
                compress: false,
                mangle: false
            },
            js: {
                expand: true,
                cwd: '.',
                src: ['static/**/*.js'],
                dest: BUILD
            }
        },
        swig: {
            all: {
                expand: true,
                cwd: TPL,
                src: ['**/*.html'],
                dest: BUILD + TPL,
                ext: '.vm'
            }
        },
        "regex-replace": {
            action: {
                src: [BUILD + '**/*.{vm,js}'],
                actions: [{
                    name: 'action',
                    search: /\.\baction\b/img,
                    replace: '',
                    flags: 'img'
                }]
            }
        },
        shell: {
            vm: {
                command: "sshpass -p 'be41191c' scp -rq build/template/* root@182.92.72.195:/export/App/www.duonet.cn/WEB-INF/vm/"
            },
            static: {
                command: "sshpass -p 'be41191c' scp -r build/static/* root@182.92.72.195:/export/App/www.duonet.cn/static/"
            }
        }
    });

    grunt.registerMultiTask('swig', 'render', function() {
        this.files.forEach(function(f) {
            var src = f.src[0].replace(TPL, '');
            grunt.file.write(f.dest, swig.renderFile(src, {}));
            grunt.log.ok(f.dest);
        });
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-yui-compressor'); //cssmin cannot handle csshack
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-web-stamp');
    grunt.loadNpmTasks('grunt-regex-replace');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['clean', 'copy:fonts', 'copy:img', /*'copy:js',*/ 'cssmin', 'uglify', 'swig', 'stamp', "regex-replace"]);
    grunt.registerTask('test', ['default', 'shell']);
    grunt.registerTask('pub', ['default', 'copy:pub_static', 'copy:pub_vm']);
};
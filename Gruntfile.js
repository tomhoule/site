module.exports = function(grunt) {

    // banner
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");
    grunt.log.writeln("      (o) Just what do you think you're doing, Matthias?    ");
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Clean stuff
        clean: ['dist/**'],

        // Copy assets around
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src/',
                    dest: 'dist/',
                    src: [
                        'assets/**',
                        '!assets/styl/**'
                    ]
                }]
            }
        },

        // Stylus
        stylus: {
            dist: {
                options: {
                    'include css': true
                },
                files: {
                    'dist/assets/css/plumage.min.css': 'src/assets/styl/plumage.styl'
                }
            }
        },

        // CSS minification
        cssmin: {
            dist: {
                options: {
                    banner: '/* plumage landing page | Author: Matthias Kretschmann <m@kretschmann.io> | © 2015 plumage */'
                },
                files: {
                    'dist/assets/css/plumage.min.css': ['dist/assets/css/plumage.min.css']
                }
            }
        },

        // JS concatenation & minification
        uglify: {
            dist: {
                files: {
                    'dist/assets/js/plumage.min.js': ['src/assets/js/plumage.js'],
                    'dist/assets/js/jquery.min.js': ['bower_components/jquery/dist/jquery.js']
                }
            }
        },

        // Assembles html layout
        assemble: {
            options: {
                data: 'src/data/*.{json,yml}',
                layoutdir: 'src/templates/layouts',
                partials: ['src/templates/includes/*.hbs'],
                flatten: true
            },
            site: {
                src: ['src/templates/pages/*.hbs'],
                dest: 'dist/'
            }
        },

        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
            options: {
                livereload: true
            },
            stylus: {
                files: ['src/**/*.styl'],
                tasks: ['stylus']
            },
            js: {
                files: ['src/**/*.js'],
                tasks: ['uglify']
            },
            templates: {
                files: ['src/**/*.hbs'],
                tasks: ['assemble']
            },
            images: {
                files: ['src/assets/img/**'],
                tasks: ['default']
            }
        },

        // dev server
        connect: {
            server: {
                options: {
                    port: 1337,
                    hostname: '*',
                    base: 'dist',
                    open: {
                         target: 'http://localhost:1337'
                    }
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('assemble');

    // Default task
    grunt.registerTask('default', [
        'copy',
        'stylus',
        'uglify',
        'assemble'
    ]);

    // Dev server
    grunt.registerTask('server', [
        'clean',
        'copy',
        'stylus',
        'uglify',
        'assemble',
        'connect',
        'watch'
    ]);

    // Final build
    grunt.registerTask('build', [
        'clean',
        'copy',
        'stylus',
        'cssmin',
        'uglify',
        'assemble'
    ]);

};

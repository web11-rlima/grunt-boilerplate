/*       Webeleven         */
/* ----------------------- */
/* Boilerplate do grunt.js */
/* ----------------------- */

module.exports = grunt => {

    var config = {

        /*------------------------------------
        # Pastas padrão
        -------------------------------------*/
        assetsPath: {
            js: 'assets/app/js',
            sass: 'assets/app/sass',
            css: 'assets/app/css',
            vendor: 'assets/vendor',
            images: 'assets/images',
            build: 'assets/build',
            dist: 'dist'
        },

        /*------------------------------------
        # JS de terceiros
        Ex: jquery.js, masonry.js, vue.js
        -------------------------------------*/
        vendorJS: [
            "bootstrap/dist/js/boostrap.js"
        ],

        /*------------------------------------
        # CSS de terceiros
        Ex: boostrap.css, fancybox.css
        -------------------------------------*/
        vendorCSS: [
            "bootstrap/dist/css/bootstrap.css"
        ],

        /*------------------------------------------------
         # Quando alguma pasta precisar ser movida
         Ex: Pasta fonts do bootstrap, pasta de ícones
         -------------------------------------------------*/
        foldersToMove: [
            "assets/vendor/bootstrap/dist/fonts"
        ]
    };

    prepareGruntConfig(config);
    require('load-grunt-tasks')(grunt);


    grunt.initConfig({

        config: config,

        /*##########################################################################
                                        Tasks de CSS
        ##########################################################################*/
        /*------------------------------------
        # Task que compila o SASS
        -------------------------------------*/
        sass: {
            dist: {
                files: {
                    '<%= config.assetsPath.css %>/main.css': '<%= config.assetsPath.sass %>/main.scss'
                }
            }
        },


        /*------------------------------------
         # Task que concatena CSS
         -------------------------------------*/
        concat_css: {
            vendor: {
                src: config.vendorCSS,
                dest: "<%= config.assetsPath.css %>/vendor.css"
            },

            dist: {
                src: ['<%= config.assetsPath.css %>/vendor.css', '<%= config.assetsPath.css %>/main.css'],
                dest: "<%= config.assetsPath.css %>/app.css"
            },

            dev: {
                src: ['<%= config.assetsPath.css %>/vendor.css', '<%= config.assetsPath.css %>/main.css'],
                dest: "<%= config.assetsPath.dist %>/css/app.min.css"
            }

        },

        /*------------------------------------
         # Task que minifica CSS
         -------------------------------------*/
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            dist: {
                files: {
                    '<%= config.assetsPath.dist %>/css/app.min.css': ['<%= concat_css.dist.dest %>']
                }
            }
        },


        /*##########################################################################
         Tasks de JS
         ##########################################################################*/
        /*------------------------------------
         # Task que concatena os JS
         -------------------------------------*/
        concat: {
            options: {
                separator: ';'
            },
            app: {
                src: '<%= config.assetsPath.js %>/**/*.js',
                dest: '<%= config.assetsPath.build %>/compiled.js'
            },
            vendor: {
                src: config.vendorJS,
                dest: '<%= config.assetsPath.build %>/vendor.js'
            },
            dist: {
                src: ['<%= concat.vendor.dest %>', '<%= concat.app.dest %>'],
                dest: '<%= config.assetsPath.build %>/bundle.js'
            },
            dev: {
                src: ['<%= concat.vendor.dest %>', '<%= concat.app.dest %>'],
                dest: '<%= config.assetsPath.dist %>/js/app.min.js'
            }
        },

        /*------------------------------------
         # Task que minifica o JS
         -------------------------------------*/
        uglify: {
            options: {
                preserveComments: false,
                banner: '/*! Webeleven - App */\n'
            },
            dist: {
                files: {
                    '<%= config.assetsPath.dist %>/js/app.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },


        /*------------------------------------
         # Task de limpeza de arquivo
         -------------------------------------*/
        clean: {
            js: ['<%= config.assetsPath.build %>/']
        },


        /*##########################################################################
         Tasks de movimentação de arquivos
         ##########################################################################*/
        copy: {
            dist: {
                files: config.copy.files
            }
        },

        watch: {
            css: {
                files: [
                    '<%= config.assetsPath.sass %>/*.scss'
                ],
                tasks: ['css:dev'],
                options: {
                    spawn: false,
                    event: ['changed']
                }
            },
            js: {
                files: [
                    '<%= config.assetsPath.js %>/**/*.js'
                ],
                tasks: ['js:dev'],
                options: {
                    spawn: false,
                    event: ['changed']
                }
            }
        }

    });

    /*
    **** Task para ser executada toda vez que uma biblioteca de vendor for atualizada ****
    */
    grunt.registerTask('vendor', 'Task para ser executada toda vez que o bower for atualizado', [
        'concat_css:vendor',
        'concat:vendor',
        'copy:dist',
        'dev'
    ]);

    //Registrando tasks de CSS
    grunt.registerTask('css:dev', 'Compila o CSS (Modo dev)', ['sass', 'concat_css:dev']);
    grunt.registerTask('css:dist', 'Compila o CSS (Modo produção)', ['sass', 'concat_css:vendor', 'concat_css:dist', 'cssmin:dist']);

    //Registrando tasks de JS
    grunt.registerTask('js:dev', 'Compila o JS (Modo dev)', ['concat:app', 'concat:dev', 'clean:js']);
    grunt.registerTask('js:dist', 'Compila o CSS (Modo produção)', [
            'vendor',
            'concat:app',
            'concat:vendor',
            'concat:dist',
            'uglify:dist',
            'clean:js'
        ]
    );

    grunt.registerTask('dev', 'Compila o CSS e o JS para dev', ['js:dev', 'css:dev'])

    //Task de produção
    grunt.registerTask('dist', 'Compila o CSS e o JS para produção', ['js:dist', 'css:dist']);
};




//-----------------------------
//Funções
//-----------------------------
function prepareGruntConfig(config) {
    //Coloca o caminho da pasta vendor do bower na array de vendor
    prefixVendorPath(config);

    //Configura a task para a copia de pastas
    setFoldersToCopy(config);
}

function setFoldersToCopy(config) {
    config.copy = {
        files: []
    };

    for (i = 0; i < config.foldersToMove.length; i++){

        var folderName = config.foldersToMove[i].substr(config.foldersToMove[i].lastIndexOf('/') + 1);
        config.copy.files.push({
            expand: true,
            cwd: config.foldersToMove[i],
            src: ['**'],
            dest: '<%= config.assetsPath.dist %>/' + folderName
        });
    }
}

function prefixVendorPath(config) {
    for (i = 0; i < config.vendorJS.length; i++){
        config.vendorJS[i] = config.assetsPath.vendor + "/" + config.vendorJS[i];
    }

    for (i = 0; i < config.vendorCSS.length; i++){
        config.vendorCSS[i] = config.assetsPath.vendor + "/" + config.vendorCSS[i];
    }
}
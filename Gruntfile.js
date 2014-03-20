
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    hostname: '0.0.0.0'
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['karma']);
};

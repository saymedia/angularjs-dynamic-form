
module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        connect: {
            options: {
                port: 9001,
                hostname: '0.0.0.0'
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
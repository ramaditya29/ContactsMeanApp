module.exports = function(grunt){
	"use strict";
	var watchFiles = {
		serverJS: ['gruntfile.js','server.js', 'config/**/*.js', 'app/**/*.js'],
		serverViews: ['app/views/*.html'],
		clientViews: ['public/src/**/*.html'],
		clientJS: ['public/src/**/*.js']
	};
	
	//Configuration of the grunt
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
            serverViews: {
                files: watchFiles.serverViews,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: watchFiles.serverJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: watchFiles.clientViews,
                options: {
                    livereload: true,
                }
            },
            clientJS: {
                files: watchFiles.clientJS,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            }
        },    
	jshint: {
		all:{
			src: watchFiles.serverJS.concat(watchFiles.clientJS),
			options: {
				jshintrc: true
			}
		}
	},
	uglify: {
            production: {
                options: {
                    mangle: false
                },
                files: {
                    'public/dist/application.min.js': ['public/src/**/*.js', 'public/app.js']
                }
            }
        },
        ngAnnotate: {
            production: {
                files: {
                    'public/dist/application.js': '<%= applicationJavaScriptFiles %>'
                }
            }
        },
	nodemon: {
		dev: {
			script: 'server.js',
			options:{
				ext: 'js,html',
				watch: watchFiles.serverViews.concat(watchFiles.serverJS)
			}
		}
	},
	'node-inspector': {
		custom: {
	        options: {
	            'web-port': 1337,
	            'web-host': 'localhost',
	            'debug-port': 5858,
	            'save-live-edit': true,
	            'no-preload': true,
	            'stack-trace-limit': 50,
	            'hidden': []
	        }
	    }
	},
	concurrent: {
		default: ['nodemon', 'watch'],
		options: {
			logConcurrentOutput: true,
        		limit: 10
		}
	},
	karma: {
		unit:{
			configFile: 'karma.conf.js'
		}
	}

});

	//Loading of the grunt tasks 

	// Used for loading the watch plugin for watching the files 
	grunt.loadNpmTasks('grunt-contrib-watch');
	//Used for loading the jshint plugin for checking the javascript syntax
	grunt.loadNpmTasks('grunt-contrib-jshint');
	//Used for minifying the javascript files 
	grunt.loadNpmTasks('grunt-contrib-uglify');
	//Add, remove and rebuild AngularJS dependency injection annotations
	grunt.loadNpmTasks('grunt-ng-annotate'); 
	//Used for starting the node server using nodemon
	grunt.loadNpmTasks('grunt-nodemon');
	//grunt.loadNpmTasks('grunt-node-inspector');

	//Concurrent plugin can be used to execute the two plugins simulataneously
	grunt.loadNpmTasks('grunt-concurrent');
	//Karma plugin for configuring the unit test cases 
	grunt.loadNpmTasks('grunt-karma');



	// Making grunt default to force in order not to break the project.
    	grunt.option('force', true);

        // A Task for loading the configuration object
    	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
        	//var init = require('./config/init')();
        	var config = require('./config/config');

        	grunt.config.set('applicationJavaScriptFiles', config.assets.app.js);
        	//grunt.config.set('applicationCSSFiles', config.assets.app.css);
    	});

	/* 
		* Default task. It will be called when we executed command like grunt in your command line with no commands
		* This will start the server. Because nodemon is used to start the server.
	*/
	grunt.registerTask('default', ['concurrent:default']);


	/*
		debug task
	*/
	grunt.registerTask('debug', ['concurrent:debug']);

	//Checking Javascript Syntaxes 
	// When you execute the grunt this will execute the jshint plugin
	grunt.registerTask('lint', ['jshint:all']);

	//Test cases 
	grunt.registerTask('test', ['karma:unit']);


	//Minifying the files.
	grunt.registerTask('build', ['loadConfig','ngAnnotate','uglify']);


};

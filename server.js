'use strict';

/*
	Declaration
*/
var mongoose = require('mongoose'),
	chalk = require('chalk'),
	config = require('./config/config');


var db = mongoose.connect(config.db, function(error){
	if(error){
		console.log(chalk.red("Unable to connect to mongodb"));
		throw error;
	}
	//console.log(chalk.blue("Connected Successfully"));
});

var app = require('./config/express')(db);

app.listen(config.port, function(error){
	if(error){
		console.log(chalk.red('Cannot start the server'));
		console.log(chalk.red(error));
	}
	console.log(chalk.blue('Server Started Successfully'));
	console.log(chalk.blue('http://localhost' + config.port));
});
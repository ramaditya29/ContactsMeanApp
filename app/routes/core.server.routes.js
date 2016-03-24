'use strict';


module.exports = function(app){
	var core = require('../../app/controllers/core.server.controller.js');
	app
		.route('/')
		.get(core.index);
};
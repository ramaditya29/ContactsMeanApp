'use strict';

/*
	Module Dependencies
*/

var express = require('express'),
	router = express.Router(),
	bodyParser = require('body-parser');

module.exports = function(app){

	var contact = require('../../app/controllers/contact.server.controller.js');

	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({ extended: false }));
	router
		.route('/contact')
		.get(contact.getAllContacts)
		.post(contact.createContact);	
	
	router
		.param('firstname', function(req, res, next){
			next();
		})
		.route('/contact/:firstname')
			.get(contact.getContact)
			.delete(contact.deleteContact);
	app.use('/api', router);

};
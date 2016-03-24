'use strict';

var mongoose = require('mongoose'),
	Contact = mongoose.model('Contact');
	//Contact = require('../models/contact.server.models.js');
	
module.exports.getAllContacts = function(req, res){
	Contact.find({} , function(err, data){
		if(err){
			console.log("error");
			throw err;
		}	
		res.json(data);
	});
};

module.exports.createContact = function(req, res){
	//res.send("firstname: " + req.body.firstname + "lastname:" + req.body.lastname);
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;
	if(firstname != '' && lastname != '')
	{
		var newUser = Contact({
			firstname: firstname,
			lastname: lastname
		});
		newUser.save(function(err){
			if(err){
				throw err;
			}
			res.json("Inserted Successfully");
		});
	}
	else
		res.json("Fields are missing");
}

module.exports.deleteContact = function(req, res){
	var firstname = req.params.firstname;
	Contact.findOneAndRemove({ firstname: firstname }, function(err) {
	  if (err) throw err;

	  // delete him
	 

	    console.log('Contact successfully deleted!');
	    res.json('Contact successfully deleted!');
	  
	});

};

module.exports.getContact = function(req, res){
	var firstname = req.params.firstname;
	Contact.find({firstname: firstname}, function(err, contacts){
		if(err)
			throw err;
		res.json(contacts[0]);
	});
};
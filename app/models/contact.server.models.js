'use strict';


var mongoose = require('mongoose'),
   Schema = mongoose.Schema;

 var _contactSchema = new Schema({
	firstname : {
		type: String,
		default: '',
		trim: true
	},	
	lastname: {
		type: String,
		default: '',
		trim: true
	}
});
var db = mongoose.model('Contact', _contactSchema);
//module.exports = db;



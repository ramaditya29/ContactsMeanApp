var Chance = require('chance'),
	mongoose = require('mongoose'),
	Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/contactsDev');
var chance1 = new Chance();
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
var contacts = mongoose.model('Contact', _contactSchema);

for(var i = 0; i <= 10; i++){
	var contact = new contacts({
		firstname: chance1.first(),
		lastname: chance1.last()
		
	});
	contact.save(function(error){
		if(error){
			throw error;
		}
		console.log("Inserted Successfully");
	});
}
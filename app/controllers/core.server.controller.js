'use strict';


module.exports.index = function(req, res){

	console.log("This is the main index file");
	res.render('index');
	//res.send("Hello world");
};
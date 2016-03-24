'use strict';

/**
 * Module Dependencies
 * */
 var express = require('express'),
    config = require('./config'),
    consolidate = require('consolidate'),
    path = require('path'),
    bodyParser = require('body-parser');

module.exports = function(db){

    var app = express();

    //console.log("Hello ");
    //Init all models
    config.getGlobbedFiles('./app/models/**/*.models.js'). forEach(function(routePath){
        //console.log(routePath);
        require(path.resolve(routePath));
    });
    //Init all routers
    config.getGlobbedFiles('./app/routes/**/*.routes.js'). forEach(function(routePath){
        require(path.resolve(routePath))(app);
    });

    //Bootstrapping Template Engine
    app.engine('server.view.html', consolidate[config.templateEngine]);
    app.set('view engine', 'server.view.html');
    app.set('views', './app/views');

    //Setting the app router and static folders within Public directory
    app.use(express.static(path.resolve('./public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //binding application local variables - Js and Css

    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();
  	
   

    return app;
};
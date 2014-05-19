var express = require('express');
var path = require('path');
var ROUTES = require('./routes');

var init_application = function(routes) {
    var expressApp = express();
    
    expressApp.set('views', __dirname + '/views');
    expressApp.set('view engine', 'ejs');
    expressApp.set('port', process.env.port || 8080);
    expressApp.use(express.static(path.join(__dirname, 'content')));
    expressApp.use(express.logger());

    for(var ii in ROUTES) {
	expressApp.get(ROUTES[ii].path, ROUTES[ii].fn);
    }

    return expressApp;
};

var app = init_application(ROUTES);

module.exports = app;

#!/usr/bin/node

var request = require('request');
var http = require('http');
var app = require('./application');
var db = require('./models');

global.db.sequelize.authenticate().complete(function(err) {
    if (err) {
	console.log("An error occurred: ", err);
        throw err;
    } else {
	http.createServer(app).listen(app.get('port'), function() {
	    console.log("Listening on " + app.get('port'));
	});
    }
});

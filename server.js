#!/usr/bin/node

var request = require('request');
var http = require('http');
var app = require('./application');
var db = require('./models');

var server = http.createServer(app);
var startserver = function() {

//    global.db.sequelize.sync({ force: true }).complete(function(err) {
    global.db.sequelize.authenticate().complete(function(err) {
	if (err) {
	    console.log("An error occurred: ", err);
	} else {
	    server.listen(app.get('port'), function() {
		console.log("Listening on " + app.get('port'));
	    });
	}
    });
};

var stopserver = function() {
    server.close();
};

if (require.main === module) {
    startserver();
} else {
    console.info("Running application as a module");
    exports.startserver = startserver;
    exports.stopserver = stopserver;
    exports.port = app.get('port');
}

#!/usr/bin/node

var request = require('request')
  ,  http = require('http')
  , app = require('./application')
  , db = require('./models')
  , server = http.createServer(app)
  , logger = require('./lib/logger.js')
  ;

var startserver = function() {

// TODO: cleanup db connection
//  global.db.sequelize.sync({ force: true }).complete(function(err) {
    global.db.sequelize.authenticate().complete(function(err) {
	if (err) {
	    logger.error({ err: err }, "Database connection failed, could not start server");
	} else {
	    server.listen(app.get('port'), function() {
		logger.info({ server_status: "Listening on " + app.get('port') });
	    });
	}
    });
};

var stopserver = function() {
    var cleanuptimer = setTimeout(function () {
	process.exit(1);
    }, 30000);
    cleanuptimer.unref();  

    server.close();
};

if (require.main === module) {
    startserver();
} else {
    // run application as a module
    exports.startserver = startserver;
    exports.stopserver = stopserver;
    exports.port = app.get('port');
}

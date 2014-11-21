var express = require('express')
  , path = require('path')
  , ROUTES = require('./routes')
  , cons = require('consolidate')
  , logger = require('./logger.js')
  , uuid = require('uuid')
  , hbsutils = require('./content/js/hbsutils.js')
  , ApplicationError = require('./errors.js')
  , ErrorTypes = require('./constants.js').ErrorTypes
  ;

var init_application = function(routes) {
    var expressApp = express();

    expressApp.engine('handlebars', cons.handlebars);
    expressApp.set('view engine', 'handlebars');
    expressApp.set('views', __dirname + '/views');
    expressApp.set('port', process.env.port || 8080);
    expressApp.use(express.static(path.join(__dirname, 'content')));
    hbsutils.registerPartials(__dirname + '/views/partials');
    hbsutils.registerHelpers();

    // logging middleware
    expressApp.use(function (request, response, next) {
	var requestStart = Date.now();
	request.requestId = uuid.v1();    
        logger.info({ req: request });

        request.on('end', function () {
	    response.responseTime = Date.now() - requestStart;
	    response.requestId = request.requestId;
	    logger.info({ res: response });
        });

	next();

    });

    if ('development' == expressApp.get('env')) {
	expressApp.use(express.errorHandler());
    }

    // router middleware
    for(var ii in ROUTES) {
	expressApp.get(ROUTES[ii].path, ROUTES[ii].fn);
    }

    // error handler middleware
    expressApp.all('*', function(request, response, next) {
        var msg = "Could not find the resource " + request.originalUrl;
	next(new ApplicationError({'name': ErrorTypes.ResourceNotFoundError, 'message': msg, 'logMessage': msg}));
    });
	     
    expressApp.use(function (error, request, response, next) {
	error.requestId  = request.requestId;
        
        if (error.name === 'UnexpectedError') {
          logger.fatal({ err: error }, error.logMessage);
        }
        else {    
          logger.error({ err: error }, error.logMessage);
        }
	next(error);
    });
    expressApp.use(function (error, request, response, next) {
	if (request.xhr) {
	    response.status(500).send({ "error": error.message });
        } else {
	    next(error);
        }
    });
    expressApp.use(function (error, request, response, next) {
	response.status(500);
        response.render('error', { "title": "Error Page", "error": error.message });
    });
		   
    return expressApp;
};

var app = init_application(ROUTES);

module.exports = app;

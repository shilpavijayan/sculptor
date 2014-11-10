var bunyan = require('bunyan')
  , path = require('path')
  ;

var requestSerializer = function (req) {
    if (!req || !req.connection) {
	return req;
    }

    return {
	url: req.url,
	method: req.method,
	protocol: req.protocol,
	requestId: req.requestId,
	ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
	headers: req.headers
    };
};

var responseSerializer = function (res) {
    if (!res) {
	return res;
    }

    return {
	statusCode: res.statusCode,
	headers: res._header,
	requestId: res.requestId,
	responseTime: res.responseTime
    };
};

var errorSerializer = function (err) {
    if (!err || !err.stack) {
	return err;
    }

    return {
	message: err.message,
	name: err.name,
	stack: err.stack,
	propertyName: err.propertyName || 'na',
	propertyValue: err.propertyValue || 'na',
	requestId: err.requestId
    };
};

// TODO: create streams if non existent	
var logger = bunyan.createLogger({
    name: "slog",
    serializers: {
	req: requestSerializer,
	res: responseSerializer,
	err: errorSerializer
    },
    streams: [{
	    level: 'info',
	    path: path.join(__dirname + '/logs/sculptor-info.log')
    }, 
    {
	    level: 'error',
            path: path.join(__dirname + '/logs/sculptor-errors.log')
    }]
});    

module.exports = logger;

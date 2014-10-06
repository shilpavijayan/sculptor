var express = require('express')
  , path = require('path')
  , ROUTES = require('./routes')
  , cons = require('consolidate')
  , hbsutils = require('./content/js/hbsutils.js')
  ;

var init_application = function(routes) {
    var expressApp = express();
    
    expressApp.engine('handlebars', cons.handlebars);
    expressApp.set('view engine', 'handlebars');
    expressApp.set('views', __dirname + '/views');
    expressApp.set('port', process.env.port || 8080);
    expressApp.use(express.static(path.join(__dirname, 'content')));
    expressApp.use(express.logger());

    hbsutils.registerPartials(__dirname + '/views/partials');
    hbsutils.registerHelpers();

    for(var ii in ROUTES) {
	expressApp.get(ROUTES[ii].path, ROUTES[ii].fn);
    }

    return expressApp;
};

var app = init_application(ROUTES);

module.exports = app;

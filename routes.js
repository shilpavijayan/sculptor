var uu = require('underscore');
var homeController =  require('./controllers/homeController.js');

var map_routes = function(dict) {
    
    var toroute = function(item) {
	return uu.object(uu.zip(['path', 'fn'], [item[0], item[1]]));
    };
	
    return uu.map(uu.pairs(dict), toroute);
};
    
var ROUTES = map_routes({
    '/': homeController.home,
    '/api/products': homeController.products,
});

module.exports = ROUTES;
    

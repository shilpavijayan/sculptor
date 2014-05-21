var db = require('../models');

var home = function(request, response) {
    var successcb = function(products_json) {
	response.render("home2", {
	    title: "Home Page",
	    products: products_json,
	    categories: {id: 1, name: "Games"} });
	};
    var errcb = errfn('error retrieving products', response);
    global.db.Product.allToJSON(successcb, errcb);
//    response.render("home2", {
  //      title: "Home Page"
//    });*/
};

var about = function(request, response) {
    response.send("home2");
};

var contact = function(request, response) {
    response.send("home2");
};

var platforms = function(request, response) {
    var successcb = function(platforms) {
	response.json(platforms); 
    };
    var errcb  = errfn('error retrieving product platforms', response);
    global.db.ProductPlatform.allToJSON(request.id, successcb, errcb);
};
 
var errfn = function(errmsg, response) {
    return function(err) {
	console.log(err);
	response.send(errmsg);
    };	
};

exports.home = home;
exports.about = about;
exports.contact = contact;
exports.platforms = platforms;


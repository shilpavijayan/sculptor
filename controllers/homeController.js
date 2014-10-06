var db = require('../models');

var home = function(request, response) {
    var successcb = function(products_json) {
	response.render("home", {
	    title: "Home Page",
	    productlist: {category_id: "1", products: products_json},
	    categories: [{id: 1, name: "Games"},{id: 2, name: "Math"}] });
            console.log(products_json);
	};
    var errcb = errfn('error retrieving products', response);
    global.db.Product.allToJSON(successcb, errcb);
};

var products = function(request, response) {
    var successcb = function(products_json) {
	response.json({productlist: {category_id: "2", products: products_json}});
     };
    var errcb = errfn('error retrieving products', response);
    global.db.Product.allToJSON(successcb, errcb);
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
exports.products = products;


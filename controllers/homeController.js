var db = require('../models');
var ApplicationError = require('../errors.js').ApplicationError;
var ErrorTypes = require('../errors.js').ErrorTypes;

var home = function (request, response, next) {
    var successcb = function (products) {
	response.render("home", {
	    title: "Home Page",
	    productlist: {"category_id": "1", "products": products},
	    categories: [{"id": "1", "name": "Games"},{"id": 2, "name": "Math"}] });
            console.log(products);
    };
    var errcb = errfn(next);
    global.db.Product.allToJSON(successcb, errcb);
};

var products = function (request, response, next) {
    try {
	var category_id = request.query.category_id;
	if (!category_id)
	    return next(new ApplicationError({'name': ErrorTypes.InvalidArgumentError, 'message': 'Could not retrieve product list. No category selected.'}));

	var successcb = function (products) {
	    response.json({"productlist": {"category_id": category_id, "products": [products]}});
	};
	var errcb = errfn(next);

	global.db.Product.findByCategoryId(category_id, successcb, errcb);
    }
    catch (e) {
	return next(e);
    }
};

var about = function (request, response, next) {
    response.send("home");
};

var contact = function (request, response, next) {
    response.send("home");
};

var platforms = function (request, response, next) {
    var product_id = request.query.product_id;
    if (!product_id) 
	return next(new Error('Could not retrieve product platforms. No product selected.'));
    var successcb = function (platforms) {
	response.json(platforms); 
    };
    var errcb = errfn(next);
    global.db.ProductPlatform.allToJSON(product_id, successcb, errcb);
};
 
var errfn = function (next) {
    return function (err) {
	return next(err); 
    };
};

exports.home = home;
exports.about = about;
exports.contact = contact;
exports.platforms = platforms;
exports.products = products;


var consts = require('../constants.js');
var HomeViewmodel = require('../viewmodels/home-viewmodel.js').HomeViewmodel;
var ApplicationError = require('../errors.js');

var ErrorTypes = consts.ErrorTypes;
var Constants = consts.Constants;
var PlatformTypes = consts.PlatformTypes;
var AssetTypes = consts.AssetTypes;

var home = function (request, response, next) {
  try {
    var viewdata = { title: Constants.home, about: Constants.about };

    var successcb = function (products) {
      var category_id = products[0].category_id;
      viewdata.productlist = { 'category_id': category_id, 'products': products };	
      response.render("home", viewdata);
    };

    var productscb = function(categories) {
      var category_id = categories[0].id;
      viewdata.categories = categories;
      HomeViewmodel.getProductsByCategory({ cid: category_id, assets: { target: Constants.home, type: AssetTypes.Image } }, successcb, errcb);
    };

    var errcb = errfn(next);

    HomeViewmodel.getCategories(productscb, errcb);
	    
  } catch (e) {
    return next(e);
  }
};

var products = function (request, response, next) {
  try {
    var category_id = request.query.category_id;
    if (!category_id || typeof category_id != "number") {
      return next(new ApplicationError({ 
	'name': ErrorTypes.InvalidArgumentError, 
	'message': 'Could not retrieve product list. Not a valid category.',
	'logMessage': 'file: homeController, method: products, error: Argument category_id is missing or invalid'
      }));
    }

    var successcb = function (products) {
      response.json({ 'productlist': { 'category_id': category_id, 'products': products } });
    };

    var errcb = errfn(next);
	
    HomeViewModel.getProductsByCategory({ cid: category_id, assets: { target: Constants.home, type: AssetTypes.Image } }, successcb, errcb); 

  } catch (e) {
    return next(e);
  }
};

var errfn = function (next) {
    return function (err) {
	return next(err); 
    };
};

exports.home = home;
exports.products = products;


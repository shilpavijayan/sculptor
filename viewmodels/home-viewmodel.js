var db = require('../models');
var ApplicationError = require('../errors.js');
var ErrorTypes = require('../constants.js').ErrorTypes;

exports.HomeViewmodel = (function () {
  return {
    getCategories: function (successcb, errcb) {
      if (!successcb || typeof successcb !== 'function') {
        throw new ApplicationError({
          'name': ErrorTypes.UnexpectedError, 
          'message': 'UnexpectedErrorMessage', 
          'logMessage': 'Expected argument successcb to function allToJSON', 
          'propertyName': 'successcb', 
          'propertyValue': 'undefined or not a fucntion'
        });
      }

      if (!errcb || typeof errcb !== 'function') {
        throw new ApplicationError({
          'name': ErrorTypes.UnexpectedError, 
          'message': 'UnexpectedErrorMessage', 
          'logMessage': 'Expected argument errcb to function allToJSON', 
          'propertyName': 'errcb', 
          'propertyValue': 'undefined or not a fucntion'
        });
      }

      global.db.ProductCategory
        .findAll()
        .success(function (categories) {
	  if (!categories || categories.length === 0) {
            errcb(new ApplicationError({
	      'name': ErrorTypes.DataError,
	       'message': 'Could not retrieve categories list. Internal server error.'
            }));
 	  } else {
	    successcb(categories);
          }
         })
         .error(function () {
           errcb(new ApplicationError({
	     'name': ErrorTypes.DataError,
              'message': 'Could not retrieve categories list. Internal server error.'
           }));
          });       
    },
    getProductsByCategory: function (options, successcb, errcb) {
      if (!successcb || typeof successcb !== "function") {
        throw new ApplicationError({
          'name': ErrorTypes.UnexpectedError,
          'message': 'UnexpectedErrorMessage',
          'logMessage': 'File: ' + file + ', Method: ' + methodName + ', Error: Expected argument successcb to function findByCategoryId',
          'propertyName': 'successcb',
          'propertyValue': 'undefined or not a fucntion'
         });
       }

       if (!errcb || typeof errcb !== "function") {
         throw new ApplicationError({
           'name': ErrorTypes.UnexpectedError,
           'message': 'UnexpectedErrorMessage',
           'logMessage': 'File: ' + file + ', Method: ' + methodName + ', Error: Expected argument errcb to function findByCategoryId',
           'propertyName': 'errcb',
           'propertyValue': 'undefined or not a fucntion'
          });
        }

        if (!options
          || typeof options !== "object"
          || !options.cid
          || typeof options.cid !== "number") {

          errcb(new ApplicationError({
            'name': ErrorTypes.InvalidArgumentError,
            'message': 'Could not retrieve product list. Invalid arguments.',
            'logMessage': 'File: ' + file + ', Method: ' + methodName + ', Error: Argument category id was missing to function findByCategoryId',
            'propertyName': 'cid',
            'propertyValue': 'undefined'
           }));
         }

      global.db.Product
	.findAll({
          where: {category_id: options.cid},
          include: [
	      { model: global.db.ProductAsset, where: options.assets },
	      { model: global.db.Platform, where: options.platforms }
          ]
         })
        .success(function (products) {
	  if (!products || products.length === 0) {
            errcb(new ApplicationError({
              'name': ErrorTypes.DataError,
              'message': 'No products found for this category.'
            }));
          } else {
	    successcb(products);
          }
        }) 
        .error(function () {
          errcb(new ApplictionError({
            'name': ErrorTypes.DataError,
            'message': 'Could not retrieve product list. Internal server error.'
          }));
        });
    }
  }; 

} ());

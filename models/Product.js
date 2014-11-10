var async = require('async');
var util = require('util');
var uu  = require('underscore');
var ApplicationError = require('../errors.js').ApplicationError;
var ErrorTypes = require('../errors.js').ErrorTypes;

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Product', {
	    name: {type: DataTypes.STRING, allowNull: false, unique: true},
            desc: {type: DataTypes.TEXT},
	    category_id: {type: DataTypes.INTEGER, references: "ProductCategory", referencesKey: "id", onDelete: "cascade", onUpdate: "cascade"}
           }, {
	    classMethods: {
		getCount: function() {
		    return this.count().success(function(c) {
			console.log("There are %s products", c);});
		},
                //TODO: remove function
		allToJSON: function(successcb, errcb) {
		    if (!successcb || typeof successcb !== 'function') {
			throw new ApplicationError({'name': ErrorTypes.UnexpectedError, 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument successcb to function allToJSON', 'propertyName': 'successcb', 'propertyValue': 'undefined or not a fucntion'});
                    }

                    if (!errcb || typeof errcb !== 'function') {
			throw new ApplicationError({'name': ErrorTypes.UnexpectedError, 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument errcb to function allToJSON', 'propertyName': 'errcb', 'propertyValue': 'undefined or not a fucntion'});
                    }

		    return this.findAll()
		               .success(function(products) {
				   if (!products) {
       				       errcb(new ApplicationError({'name': ErrorTypes.DataError, 'message': 'No products found.'}));
                                   } else {
 				       successcb(uu.invoke(products, "toJSON"));
                                   }
                               })
			       .error(function () {
				   errcb(new ApplicationError({'name': ErrorTypes.DataError,'message': 'Could not retrieve product list. Internal server error.'}));
                               });
		},
                findByCategoryId: function (cid, successcb, errcb) {
		    if (!successcb || typeof successcb !== 'function') {
			throw new ApplicationError({'name': ErrorTypes.UnexpectedError, 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument successcb to function findByCategoryId', 'propertyName': 'successcb', 'propertyValue': 'undefined or not a fucntion'});
                    }

                    if (!errcb || typeof errcb !== 'function') {
			throw new ApplicationError({'name': ErrorTypes.UnexpectedError, 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument errcb to function findByCategoryId', 'propertyName': 'errcb', 'propertyValue': 'undefined or not a fucntion'});
                    }
 
                    if (!cid) {
			errcb(new ApplicationError({'name': ErrorTypes.InvalidArgumentError, 'message': 'Could not retrieve product list. Invalid arguments.', 'logMessage': 'Argument category id was missing to function findByCategoryId', 'propertyName': 'cid', 'propertyVal                                      ue': 'undefined'}));
                    }

		    return this.find({ where: {category_id: cid} })
			       .success(function (products) {
				   if (!products) {
				       errcb(new ApplicationError({'name': ErrorTypes.DataError,'message': 'No products found for this category.'}));
                                   } else {				       
				       successcb(products); 
                                   }   
			       })
		               .error(function () {
				   errcb(new ApplicationError({'name': ErrorTypes.DataError, 'message': 'Could not retrieve product list. Internal server error.'}));
                               });
		}		   
	    },	
	    instanceMethods: {
		getID: function() {
		    return util.format("Product ID: %s", this.id);
		
		}
	    },
	    underscored: true,
	    freezeTableName: true,
	    updateAt: 'updated',
	    createdAt: 'created'
        });
};

	    


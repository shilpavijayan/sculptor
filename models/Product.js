var async = require('async');
var util = require('util');
var uu  = require('underscore');
var ApplicationError = require('../errors.js');

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
		    if (!successcb || typeof errcb !== Function)
			throw new ApplicationError({'name': 'UnexpectedError', 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument successcb to function allToJSON', 'propertyName': 'successcb', 'propertyValue': 'undefined or not a fucntion'});

                    if (!errcb || typeof errcb !== Function)
			throw new ApplicationError({'name': 'UnexpectedError', 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument errcb to function allToJSON', 'propertyName': 'errcb', 'propertyValue': 'undefined or not a fucntion'});

		    return this.findAll()
		               .success(function(products) {
				   successcb(uu.invoke(products, "toJSON"));
                               })
			       .error(function () {
				   errcb(new ApplicationError({'name': 'DataError','message': 'Could not retrieve product list. Internal server error.'}));
                               });
		},
                findByCategoryId: function (cid, successcb, errcb) {
		    if (!successcb || typeof errcb !== Function)
			throw new ApplicationError({'name': 'UnexpectedError', 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument successcb to function findByCategoryId', 'propertyName': 'successcb', 'propertyValue': 'undefined or not a fucntion'});

                    if (!errcb || typeof errcb !== Function)
			throw new ApplicationError({'name': 'UnexpectedError', 'message': 'UnexpectedErrorMessage', 'logMessage': 'Expected argument errcb to function findByCategoryId', 'propertyName': 'errcb', 'propertyValue': 'undefined or not a fucntion'});

                    if (!cid)
			errcb(new ApplicationError({'name': 'InvalidArgumentError', 'message': 'Could not retrieve product list. Invalid arguments', 'logMessage': 'Argument category id was missing to function findByCategoryId', 'propertyName': 'cid', 'propertyValue': 
                                                      'undefined'}));

		    return this.find({ where: {category_id: cid} })
			       .success(function (products) {
				   successcb(products); 
			       })
		               .error(function () {
				   errcb(new Error({'name': 'DataError','message': 'Could not retrieve product list. Internal server error.'}));
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

	    


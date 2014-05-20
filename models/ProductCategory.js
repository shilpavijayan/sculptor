var async = require('async');
var util = require('util');
var uu = require('underscore');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ProductCategory", { 
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	desc: {type: DataTypes.TEXT} 
	}, {
	    classMethods: {
		getCount: function() {
		    this.count().success(function(c) {
			console.log("Number of product categories are %s", c);});
		},
		allToJSON: function(successcb, errcb) {
		    return this.findall()
		               .sucess(function(categories) {
				   successcb(uu.invoke(categories, 'toJSON'));
                               })
		               .error(errcb);
                },
	    }, 
	    instanceMethods: { 
	        getID: function() {
		    return util.format("OrderID: %s", this.id);
		}
	    },
	    underscored: true,
	    freezeTableName: true,
	    updatedAt: 'updated',
	    createdAt: 'created'

    });
    
}; 	
	    
		
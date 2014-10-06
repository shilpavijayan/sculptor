var async = require('async');
var util = require('util');
var uu  = require('underscore');

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
		allToJSON: function(successcb, errcb) {
		    return this.findAll()
		               .success(function(products) {
				   successcb(uu.invoke(products, "toJSON"));
                               })
			       .error(errcb);
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

	    


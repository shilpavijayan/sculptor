var async = require('async');
var util = require('util');
var uu = require('underscore');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ProductPlatform", {
	          product_id: {type: DataTypes.INTEGER, references: "Product", referencesKey: "id", onDelete: "cascade", onUpdate: "cascade"},
	          platform_id: {type: DataTypes.INTEGER, references: "Platform", referencesKey: "id", onDelete: "cascade", onUpdate: "cascade"}
	          }, {
		      freezeTableName: true,
		      underscored: true,
		      updateAt: "updated",
		      createdAt: "created"
                  });
};    

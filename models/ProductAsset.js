var async = require('async');
var uu = require('underscore');
var util = require('util');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductAsset', {
	name: {type: DataTypes.STRING, allowNull: false},
	desc: {type: DataTypes.TEXT},
	source: {type: DataTypes.STRING},
	typ: {type: DataTypes.ENUM, values: ['image', 'video', 'audio', 'icon', 'file']},
	target: {type: DataTypes.STRING},
	product_id: {type: DataTypes.INTEGER, references: "Product", referencesKey: "id", onDelete: "cascade", onUpdate: "cascade"}
	}, {
	    classMethods: {
		getCount: function() {
		    return this.count().success(function(c) {
			console.log("There are %s assests", c);});
		}
            },
	    instanceMethods: {
		getID: function() {
		    return util.format("Asset ID: %s", this.id);
		}
            },
	    freezeTableName: true,
	    updatedAt: 'updated',
            createdAt: 'created',
            underscored: true
         });
};


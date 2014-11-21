var util = require('util');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ProductAsset', {
	name: {type: DataTypes.STRING, allowNull: false},
	desc: {type: DataTypes.TEXT, allowNull: false},
	source: {type: DataTypes.STRING, allowNull: false},
	type: {type: DataTypes.ENUM, values: ['image', 'video', 'audio', 'icon', 'file'], allowNull: false},
	target: {type: DataTypes.STRING},
	}, {
	    classMethods: {
		getCount: function() {
		    return this.count();
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


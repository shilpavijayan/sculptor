var util = require('util');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Platform', {
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	desc: {type: DataTypes.TEXT, allowNull: false},
	image_src: {type: DataTypes.STRING, allowNull: false},
	type: {type: DataTypes.ENUM, values: ['Mobile', 'Tablets', 'DeskTop'], allowNull: false}
        }, {
	classMethods: {
	    getCount: function() {
		return this.count();
	    }
        },
	instanceMethods: {
	    getID: function() {
		return util.format("Platform ID: %s", this.id);
	    }
        },
	underscored: true,
	freezeTableName: true,
	updatedAt: 'updated',
	createdAt: 'created'
    });
};	

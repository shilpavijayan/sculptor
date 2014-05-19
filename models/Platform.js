var async = require('async');
var util = require('util');
var uu = require('underscore');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Platform', {
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	desc: {type: DataTypes.TEXT},
	typ: {type: DataTypes.ENUM, values: ['Mobile', 'Tablets', 'DeskTop']}
    }, {
	classMethods: {
	    getCount: function() {
		return this.count().success(function(c) {
		    console.log("There are %s platforms", c);});
	    },
	    allToJSON: function(successcb, errcb) {
		return this.findall()
		           .success(function(platforms) {
			       successcb(uu.invoke(platforms, "toJSON"));
			   })
		           .error(errcb);
            },
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

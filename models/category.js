var util = require('util');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ProductCategory", { 
	name: {type: DataTypes.STRING, allowNull: false, unique: true},
	desc: {type: DataTypes.TEXT, allowNull: false} 
	}, {
	    classMethods: {
		getCount: function() {
		    return this.count();
		}
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
	    
		

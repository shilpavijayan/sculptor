var util = require('util');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("ProductPlatform", {
	          link_url: {type: DataTypes.STRING, allowNull: false},
	          }, {
		      freezeTableName: true,
		      underscored: true,
		      updatedAt: "updated",
		      createdAt: "created"
                  });
};

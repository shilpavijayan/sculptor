var dburl = require('../configs.js').databaseUrl();

if (!global.hasOwnProperty('db')) {
    var  Sequelize = require('sequelize');
    var sq = null;

    var host = dburl.host;
    var port = dburl.port;
    var dbname = dburl.database;
    var user = dburl.username;
    var password = dburl.password;
    var dialect = dburl.dialect;

    var config = {
	dialect: dialect,
	protocol: 'postgres',
	port: port,
	host: host
    };	
    var sq = new Sequelize(dbname, user, password, config);

    global.db = {
	Sequelize: Sequelize,
	sequelize: sq,
	Product: sq.import(__dirname + '/Product'),
	Platform: sq.import(__dirname + '/Platform'),
	ProductCategory: sq.import(__dirname + '/ProductCategory'),
	ProductAsset: sq.import(__dirname + '/ProductAsset'),
        ProductPlatform: sq.import(__dirname + '/ProductPlatform'),
        setAssociations: function () {
            this.Product.hasMany(this.ProductAsset, {onDelete: 'CASCADE', onUpdate: 'CASCADE' });
	    this.Product.hasMany(this.Platform, {through: this.ProductPlatform, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
	    this.Platform.hasMany(this.Product, {through: this.ProductPlatform, onDelete: 'CASCADE', onUpdate: 'CASCADE' });
	    this.Product.belongsTo(this.ProductCategory, {foreignKey: 'category_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
         }
     };
    global.db.setAssociations();
}

module.exports = global.db;

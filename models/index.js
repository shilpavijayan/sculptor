var dburl = require('../configs.js').databaseUrl();

if (!global.hasOwnProperty('db')) {
    var  Sequelize = require('sequelize');
    var sq = null;
    var fs = require('fs');
    var path = require('path');
    var PGCONFIG_FILE = path.join(__dirname, '../.pgpass');

 //   var pgtokens = fs.readFileSync(PGCONFIG_FILE).toString().trimRight().split(':');
//    var host = pgtokens[0];
//    var port = pgtokens[1];
//    var dbname = pgtokens[2];
//    var user  = pgtokens[3];
//    var password = pgtokens[4];
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
/*      setAssociations: function() {
///	    var product=this.Product, asset=this.ProductAsset, platform=this.Platform, category=this.ProductCategory;
//
  //          product.hasMany(asset);
	    product.hasMany(platform);
	    platform.hasMany(product);
	    category.hasMany(product);
	    
	    return;
	}*/
     };
//    global.db.setAssociations();
}

module.exports = global.db;

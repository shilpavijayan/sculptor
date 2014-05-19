module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
	'Platform',
	'typ',
	{
	    type: DataTypes.ENUM,
	    values: ['Mobile', 'Tablets', 'DeskTop']
	}
    )	
    done()
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done()
  }
}

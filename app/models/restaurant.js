'use strict';
module.exports = (sequelize, DataTypes) => {
	const Restaurant = sequelize.define('Restaurant', {
		name: DataTypes.STRING,
    	adresse: DataTypes.STRING,
    	telephone: DataTypes.INTEGER,
    	description: DataTypes.STRING,
    	image: DataTypes.STRING
  }, {});
	
	Restaurant.associate = function(models) {
		models.Restaurant.hasMany(models.Produit);
	};
	return Restaurant;
};
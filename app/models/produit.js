'use strict';
module.exports = (sequelize, DataTypes) => {
  const Produit = sequelize.define('Produit', {
    nom: DataTypes.STRING,
    prix: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Produit.associate = function(models) {
    models.Produit.belongsTo(models.Restaurant, {
      as: 'restaurant',
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Produit;
};
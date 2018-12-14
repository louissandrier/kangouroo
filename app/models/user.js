'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    username: {
      index: { unique: true },
      type: DataTypes.STRING,
      validate: {
        isUnique(value, next) {
          User.find({
            where: { username: value }
          }).done((user) => {
            if (user)
              return next("Le nom d'utilisateur est déjà utilisé.");

            next();
          });
        },
        notEmpty: {
          arg: true,
          msg: "Vous devez saisir un nom d'utilisateur."
        }
      }
    },
    salt: {
      type: DataTypes.STRING
    },
    password: {

      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          arg: true,
          msg: "Vous devez saisir un mot de passe."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          arg: true,
          msg: "Vous devez saisir un e-mail valide."
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    underscored: true,
    tableName: 'user',
  });

  User.beforeCreate((user, options) => {
    return new Promise ((resolve, reject) => {
      var salt = bcrypt.genSaltSync(8);
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        user.salt = salt;
        return resolve(user, options);
      });
    });
  });

  return User;
};
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');
var router = express.Router();
var bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
 
passport.deserializeUser(function(id, done) {
  models.User.findById(id)
  .then((user) => {
     done(null, user);
  })
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({
      where: { 
        username: username 
      }
    }).then((user) => {
      // Si l'utilisateur n'existe pas
      if (!user) { return done(null, false); }
      bcrypt.hash(password, user.salt, (err, hash) => {
        if(hash == user.password) {
          return done(null, user);
        }
        return done(null, false);
      });

    }).catch((err) => {
      return done(err);
    });
  }
));

router.get('/', function(req, res, next) {
  res.render('users/login', { user : req.user });
});

router.post('/', passport.authenticate('local', { failureRedirect: '/users/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
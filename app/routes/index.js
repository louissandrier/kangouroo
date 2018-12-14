const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');
const app = express();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Kangouroo' });
});

router.post('/search/', function(req, res, next) {
	console.log(app.use(passport.session()));
	res.redirect('/users/login');
});

module.exports = router;

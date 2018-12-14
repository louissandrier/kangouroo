const express = require('express');
const models = require('../models');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/register.twig');
});

router.post('/add/', (req, res, next) => {
	const r = req.body;
	models.User.create({
		first_name: r.first_name,
		last_name: r.last_name,
		phone: r.phone,
		password: r.password,
		email: r.email,
	}).then(function() {
		//req.flash('success', "L'utilisateur a bien été ajouté.");
		res.redirect('/users');
	}).catch((err) => {
		//req.flash('errors', err.message);
		res.redirect('/users');
	});
});

module.exports = router;

const express = require('express');
const passport = require('passport');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/monsters', require('./monsters'));
router.use('/players', require('./players'));
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
        });
}); 
module.exports = router;

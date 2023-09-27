const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/monsters', require('./monsters'));
router.use('/players', require('./players'));

module.exports = router;

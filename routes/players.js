const express = require('express');
const router = express.Router();

const playersController = require('../controllers/players');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');


router.get('/', playersController.getAll);

router.get('/:id', playersController.getSingle);

router.post('/', isAuthenticated, validation.savePlayer, playersController.createPlayer);

router.put('/:id', isAuthenticated, validation.savePlayer, playersController.updatePlayer);

router.delete('/:id', isAuthenticated, playersController.deletePlayer);

module.exports = router;

const express = require('express');
const router = express.Router();

const dieController = require('../controllers/die');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', dieController.getAll);

router.get('/:id', dieController.getSingle);

router.post('/', isAuthenticated, validation.saveDice, dieController.createDice);

router.put('/:id', isAuthenticated, validation.saveDice, dieController.updateDice);

router.delete('/:id', isAuthenticated, dieController.deleteDice);

module.exports = router;

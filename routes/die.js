const express = require('express');
const router = express.Router();

const dieController = require('../controllers/die');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', dieController.getAll);

router.get('/:id', dieController.getSingle);

router.post('/', isAuthenticated, dieController.createDice);

router.put('/:id', isAuthenticated, dieController.updateDice);

router.delete('/:id', isAuthenticated, dieController.deleteDice);

module.exports = router;

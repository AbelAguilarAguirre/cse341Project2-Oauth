const express = require('express');
const router = express.Router();

const monstersController = require('../controllers/monsters');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', monstersController.getAll);

router.get('/:id', monstersController.getSingle);

router.post('/', isAuthenticated, monstersController.createMonster);

router.put('/:id', isAuthenticated, monstersController.updateMonster);

router.delete('/:id', isAuthenticated, monstersController.deleteMonster);

module.exports = router;

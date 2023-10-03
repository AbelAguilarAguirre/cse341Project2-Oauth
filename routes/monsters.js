const express = require('express');
const router = express.Router();

const monstersController = require('../controllers/monsters');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', monstersController.getAll);

router.get('/:id', monstersController.getSingle);

router.post('/', isAuthenticated, validation.saveMonster, monstersController.createMonster);

router.put('/:id', isAuthenticated, validation.saveMonster, monstersController.updateMonster);

router.delete('/:id', isAuthenticated, monstersController.deleteMonster);

module.exports = router;

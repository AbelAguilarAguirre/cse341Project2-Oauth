const express = require('express');
const router = express.Router();

const monstersController = require('../controllers/monsters');
const validation = require('../middleware/validate');

router.get('/', monstersController.getAll);

router.get('/:id', monstersController.getSingle);

router.post('/', validation.saveMonster, monstersController.createMonster);

router.put('/:id', validation.saveMonster, monstersController.updateMonster);

router.delete('/:id', monstersController.deleteMonster);

module.exports = router;

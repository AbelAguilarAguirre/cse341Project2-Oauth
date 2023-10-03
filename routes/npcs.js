const express = require('express');
const router = express.Router();

const npcsController = require('../controllers/npcs');
const { isAuthenticated } = require('../middleware/authenticate');
const validation = require('../middleware/validate');

router.get('/', npcsController.getAll);

router.get('/:id', npcsController.getSingle);

router.post('/', isAuthenticated, validation.saveNpc, npcsController.createNpc);

router.put('/:id', isAuthenticated, validation.saveNpc, npcsController.updateNpc);

router.delete('/:id', isAuthenticated, npcsController.deleteNpc);

module.exports = router;

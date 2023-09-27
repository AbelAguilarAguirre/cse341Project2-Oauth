const express = require('express');
const router = express.Router();

const npcsController = require('../controllers/npcs');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', npcsController.getAll);

router.get('/:id', npcsController.getSingle);

router.post('/', isAuthenticated, npcsController.createNpc);

router.put('/:id', isAuthenticated, npcsController.updateNpc);

router.delete('/:id', isAuthenticated, npcsController.deleteNpc);

module.exports = router;

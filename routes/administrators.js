const express = require('express');
const router = express.Router();

// Require controller modules.
const administrator_controller = require('../controllers/administrators');

/// ADMINISTRATORS ROUTES ///

// POST request for creating administrator.
router.post('/', administrator_controller.administrator_create);

// GET request for list of all administrator items.
router.get('/', administrator_controller.administrator_list);

// GET request for one administrator.
router.get('/:id', administrator_controller.administrator_detail);

// PUT request to update administrator.
router.put('/:id', administrator_controller.administrator_update);

// DELETE request to delete administrator.
router.delete('/:id', administrator_controller.administrator_delete);

module.exports = router;
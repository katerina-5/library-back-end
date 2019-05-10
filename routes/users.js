const express = require('express');
const router = express.Router();

// Require controller modules.
const user_controller = require('../controllers/users');

/// USERS ROUTES ///

// POST request for creating user.
router.post('/', user_controller.user_create);

// GET request for list of all user items.
router.get('/', user_controller.user_list);

// GET request for one user.
router.get('/:token', user_controller.user_detail);

// PUT request to update user profile information.
router.post('/update_information', user_controller.user_update);

// POST request to change password.
router.post('/change_password', user_controller.user_change_password);

// DELETE request to delete user.
router.delete('/:id', user_controller.user_delete);

module.exports = router;
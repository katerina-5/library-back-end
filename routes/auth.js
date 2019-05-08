const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

// user sign-in
router.post('/auth', controller.signIn);

// user sign-up
router.post('/sign-up', controller.signUp);

// admin sign-in
router.post('/admin/sign-in', controller.signInToManagerPanel);

module.exports = router;

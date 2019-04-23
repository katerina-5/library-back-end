const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');

// router.post('/auth', controller.authUser);
// router.post('/sign-in', controller.signIn);

router.post('/auth', controller.signIn);

router.post('/sign-up', controller.signUp);
router.post('/admin/sign-in', controller.signInToManagerPanel);

module.exports = router;

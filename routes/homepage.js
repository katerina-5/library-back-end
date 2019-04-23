const express = require('express');
const router = express.Router();
const controller = require('../controllers/homepage');

router.get('/', controller.getBase);

module.exports = router;

const express = require('express');
const router = express.Router();

// require controller modules
const favourite_series_controller = require('./../controllers/favourite_series');

/// FAVOURITE SERIES ROUTES ///

// POST request for create favourite serie
router.post('/', favourite_series_controller.favourite_serie_create);

// DELETE request for delete favourite serie
router.post('/delete', favourite_series_controller.favourite_serie_delete);

// POST request for check serie in favourite
router.post('/check', favourite_series_controller.check_serie);

// GET request for all series (by user id)
router.get('/:token', favourite_series_controller.get_favourite_series);

module.exports = router;
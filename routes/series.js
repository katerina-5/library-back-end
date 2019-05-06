const express = require('express');
const router = express.Router();

const pool = require('../config/postgresql').pool;

// Require controller modules.
const serie_controller = require('../controllers/series');

/// SERIES ROUTES ///

// POST request for creating serie.
router.post('/', serie_controller.serie_create);

// GET request for list of all serie items.
router.get('/', serie_controller.serie_list);

// GET request for one serie.
router.get('/:id', serie_controller.serie_detail);

// PUT request to update serie.
router.put('/:id', serie_controller.serie_update);

// DELETE request to delete serie.
router.delete('/:id', serie_controller.serie_delete);

router.get('/books/:id', serie_controller.serie_books);

router.get('/authors/:id', serie_controller.serie_authors);

module.exports = router;
const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * Handles the / path.
 */
router.use('/', express.static('static'));

module.exports = router;
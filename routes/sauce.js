const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');

/**
 * Fetch all sauces
 */
router.get('/', sauceCtrl.getAllSauces);

module.exports = router;
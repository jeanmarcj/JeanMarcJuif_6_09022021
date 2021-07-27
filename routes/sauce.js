const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


/**
 * Create a sauce
 */
router.post('/', multer, sauceCtrl.createSauce);

/**
 * Update a sauce
 */
router.put('/:id', multer, sauceCtrl.modifySauce);


/**
 * Delete one sauce with an id
 */
router.delete('/:id', sauceCtrl.deleteSauce);


/**
 * Fecth one sauce with id
 */
router.get('/:id', sauceCtrl.getOneSauce);

/**
 * Fetch all sauces
 */
router.get('/', sauceCtrl.getAllSauces);

module.exports = router;
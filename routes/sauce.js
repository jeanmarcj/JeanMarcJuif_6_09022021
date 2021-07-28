const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');


/**
 * Create a sauce
 */
router.post('/', auth, multer, sauceCtrl.createSauce);

/**
 * Create a like
 */
router.post('/:id/like', auth, sauceCtrl.likeSauce);


/**
 * Update a sauce
 */
router.put('/:id', auth, multer, sauceCtrl.modifySauce);


/**
 * Delete one sauce with an id
 */
router.delete('/:id', auth, sauceCtrl.deleteSauce);


/**
 * Fecth one sauce with id
 */
router.get('/:id', auth, sauceCtrl.getOneSauce);

/**
 * Fetch all sauces
 */
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;
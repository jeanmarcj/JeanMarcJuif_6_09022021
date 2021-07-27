const Sauce = require('../models/Sauce');
const fs = require('fs');

/**
 * Save a sauce
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    console.log(sauce);
    sauce.save()
    .then(() => res.status(201).json({ message : 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}));
};

/**
 * Update a sauce
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
        ...JSON.parse(req.body.sauce)
    } : { ...req.body };
    console.log(sauceObject);
    console.log('Sauce modifiée, id: ', req.params.id);
    res.status(200).json({ message: 'Sauce modifiée !'});
}

/**
 * Delete one sauce with an id
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.deleteSauce = (req, res, next) => {
    res.status(200).json({ message: 'Objet supprimé !'});
    let sauceId = req.params.id;
    console.log('Route delete. Sauce ID: ' + sauceId);
    // res.send(`<h1>Sauce supprimée</h1>`);
}

/**
 * Fetch one sauce with an id with findOne
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.getOneSauce = (req, res, next) => {
    res.status(200);
    let sauceId = req.params.id;
    console.log('Route get one sauce "/id" reçue ! ' + sauceId);
    res.send(`<h1>Récupérer la sauce id ${sauceId}, en travaux</h1>`);
};

/**
 * Fetch all sauces with find().
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.getAllSauces = (req, res, next) => {
    res.status(200);
    console.log('Route "/" reçue !');
    res.json({ message: 'Votre requête est bien reçue'});
    // res.send('<h1>Récupérer toutes les sauces, en travaux</h1>');
};
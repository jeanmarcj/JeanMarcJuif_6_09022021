// const Sauce = require('../models/Sauce');
const fs = require('fs');

/**
 * Récupère tous les objets avec 
 * La methode find(). Permet aussi de passer une query.
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.getAllSauces = (req, res, next) => {
    res.status(201);
    console.log('Route "/" reçue !');
    // res.json({ message: 'Votre requête est bien reçue'});
    res.send('<h1>Récupérer toutes les sauces, en travaux</h1>');
};
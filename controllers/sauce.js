const Sauce = require('../models/Sauce');
const fs = require('fs');

// Protection against XSS injections
const xss = require('xss');

// Prevent SQL injections with a filter
const sanitize = require('../middleware/sanitize');

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
        // ...sauceObject,
        userId : xss(sauceObject.userId),
        name : xss(sauceObject.name),
        manufacturer : xss(sauceObject.manufacturer),
        description : xss(sauceObject.description),
        mainPepper : xss(sauceObject.mainPepper),
        heat : xss(sauceObject.heat),
        usersLiked : [],
        usersDislikes : [],
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => res.status(201).json({ message : 'Sauce enregistrée !'}))
    .catch(error => res.status(400).json({error}));
};

/**
 * Manage the like or Dislike for a sauce id
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.likeSauce = (req, res, next) => {
    const vote = req.body.like;
    switch (vote) {
        // The user like. The user id is add to the array and +1 is set to likes variable
        case 1 :
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: +1}, $push : { usersLiked : req.body.userId}
            })
            .then(() => res.status(201).json({message : 'Like ajouté !'}))
            .catch(error => res.status(500).json({ error }))
        break;
        
        // The user dislike. The user id is add to the array and dislikes is set with +1
        case -1 :
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: +1}, $push: { usersDisliked: req.body.userId}})
            .then(() => res.status(201).json({message: 'Dislike ajouté !'}))
            .catch(error => res.status(500).json({ error }))
        break;

        // The user cancel his choice : the user id is deleted from the array and set -1 to likes or dislikes
        case 0 :
            Sauce.findOne({_id: req.params.id})
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({_id: req.params.id}, { $pull: { usersLiked: req.body.userId}, $inc: {likes: -1}})
                    .then(() => res.status(201).json({message : 'Like has been canceled !'}))
                    .catch(error => res.status(500).json({error}))
                } else {
                    Sauce.updateOne({_id: req.params.id}, {
                        $pull: { usersDisliked: req.body.userId}, $inc: {dislikes: -1}
                    })
                    .then(() => res.status(201).json({message: 'Dislike cancelled !'}))
                    .catch(error => res.status(500).json({error}))
                }
            })
            .catch(error => res.status(500).json({error}))
        break;

        default :
            console.log(req.body);
    }
};

/**
 * Update a sauce
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
        { ...JSON.parse(req.body.sauce), imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    const sanitizedId = sanitize(req.params.id);
    Sauce.updateOne(
        { _id: sanitizedId },
        {
            ...sauceObject,
            _id: sanitizedId
            // name: xss(sauceObject.name),
            // manufacturer: xss(sauceObject.manufacturer),
            // description: xss(sauceObject.description),
            // mainPepper: xss(sauceObject.mainPepper),
            // heat: xss(sauceObject.heat),
            // userId: sauceObject.userId,
            // _id: req.params.id,
            // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        )
    .then(() => res.status(200).json({message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({error}));
}

/**
 * Delete one sauce with an id
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.deleteSauce = (req, res, next) => {
    const sanitizedId = sanitize(req.params.id);
    Sauce.findOne({ _id: sanitizedId })
    .then(sauce => {
        const filename = sauce.imageUrl.split('/images/'[1]);
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: sanitizedId})
            .then(() => res.status(200).json({message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
}

/**
 * Fetch one sauce with an id with findOne
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.getOneSauce = (req, res, next) => {
    const sanitizedId = sanitize(req.params.id);
    Sauce.findOne({_id: sanitizedId})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

/**
 * Fetch all sauces with find().
 * @param {*} req the request object
 * @param {*} res the response object
 * @param {*} next  the next middleware function to execute
 */
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({error}));
    res.status(200);
};
// handles CRUD operation for sauces
const Sauce = require('../models/sauceModel');
const fs = require('fs');

function addLike(res, sauceId, userId) {
    Sauce.updateOne(
        { _id: sauceId },
        {
            $inc: { likes: 1 },
            $push: { usersLiked: userId }
        }
    ).then(() => res.status(200).json({ message: 'Like updated!' })
    ).catch((error) => res.status(400).json({ error }));
}

function addDislike(res, sauceId, userId) {
    Sauce.updateOne(
        { _id: sauceId },
        {
            $inc: { dislikes: 1 },
            $push: { usersDisliked: userId }
        }
    ).then(() => res.status(200).json({ message: 'Dislike updated!' })
    ).catch((error) => res.status(400).json({ error }));
}

function updateLikes(res, sauceId, userId) {
    const sauce = Sauce.findOne({ _id: sauceId });

    if (sauce.usersLiked.includes(userId)) {
        Sauce.updateOne(
            { _id: sauceId },
            {
                $inc: { likes: -1 },
                $pull: { usersLiked: userId }
            }
        ).then(() => res.status(200).json({ message: 'updated!' })
        ).catch((error) => res.status(400).json({ error }));
    }

    if (sauce.usersDisliked.includes(userId)) {
        Sauce.updateOne(
            { _id: sauceId },
            {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: userId }
            }
        ).then(() => res.status(200).json({ message: 'updated!' })
        ).catch((error) => res.status(400).json({ error }));
    }
}

//SEARCH FOR ALL SAUCES IN DB
exports.getAllSauces = (req, res) => {
    Sauce.find().then((sauces) => { res.status(200).json(sauces); }
    ).catch((error) => { res.status(400).json({ error: error }); }
    );
};

// SEARCH FOR ONE SPECIFIC SAUCE
exports.getOneSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id }
    ).then((sauces) => { res.status(200).json(sauces); }
    ).catch((error) => res.status(400).json({ error }));
};

// UDPDATE SAUCE ENTRY 
exports.updateSauce = (req, res) => {
    const sauce = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne(
        { _id: req.params.id },
        { ...sauce, _id: req.params.id }
    ).then(() => res.status(200).json({ message: 'Sauce updated!' })
    ).catch((error) => res.status(400).json({ error }));
};

// DELETE ONE SAUCE
exports.deleteSauce = (req, res) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            fs.unlink(sauce.imageUrl, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce deleted!' }))
                    .catch(error => res.status(400).json({ error }));
            });
        }).catch(error => res.status(500).json({ error }));
};

// CREATE NEW SAUCE IN DB
exports.createSauce = (req, res, next) => {
    const sauce = JSON.parse(req.body.sauce);
    delete sauce._id;
    const newSauce = new Sauce({
        ...sauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    newSauce.save()
        .then(() => res.status(201).json({ message: 'New sauce created!' }))
        .catch((error) => res.status(400).json({ error }));
};

// ADD LIKES OR DISLIKES FROM USERS
exports.likes = (req, res, next) => {
    const userId = req.body.userId;
    const sauceId = req.params.id;

    switch (req.body.like) {
        case 1:
            addLike(res, sauceId, userId);
            break;
        case -1:
            addDislike(res, sauceId, userId);
            break;
        case 0:
            updateLikes(res, sauceId, userId);
            break;
    }
};



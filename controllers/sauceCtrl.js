// handles CRUD operation for sauces
const Sauce = require('../models/sauceModel');

//SEARCH FOR ALL SAUCES IN DB
exports.getAllSauces = (req, res) => {
    Sauce.find().then(
        (sauces) => {
            res.status(200).json(sauces);
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
};

// SEARCH FOR ONE SPECIFIC SAUCE
exports.getOneSauce = () => { };

// CREATE NEW SAUCE IN DB
exports.createSauce = () => { };

// UDPDATE SAUCE ENTRY 
exports.updateSauce = () => { };

// DELETE ONE SAUCE
exports.deleteSauce = () => { };

// ADD LIKES OR DISLIKES FROM USERS
exports.likes = () => { };

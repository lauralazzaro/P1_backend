const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauceCtrl');


//SEARCH FOR ALL SAUCES IN DB
router.get('', sauceCtrl.getAllSauces);

// SEARCH FOR ONE SPECIFIC SAUCE
router.get('/:id', sauceCtrl.getOneSauce);

// CREATE NEW SAUCE IN DB
router.post('', sauceCtrl.createSauce);

// UDPDATE SAUCE ENTRY 
router.put('/:id', sauceCtrl.updateSauce);

// DELETE ONE SAUCE
router.delete('/:id', sauceCtrl.deleteSauce);

// ADD LIKES OR DISLIKES FROM USERS
router.post(':id/like', sauceCtrl.likes);


module.exports = router;


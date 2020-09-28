const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauceCtrl');


//SEARCH FOR ALL SAUCES IN DB
router.get('/api/sauces', sauceCtrl.getAllSauces);

// SEARCH FOR ONE SPECIFIC SAUCE
router.get('/api/sauces/:id', sauceCtrl.getOneSauce);

// CREATE NEW SAUCE IN DB
router.post('/api/sauces', sauceCtrl.createSauce);

// UDPDATE SAUCE ENTRY 
router.put('/api/sauces/:id', sauceCtrl.updateSauce);

// DELETE ONE SAUCE
router.delete('/api/sauces/:id', sauceCtrl.deleteSauce);

// ADD LIKES OR DISLIKES FROM USERS
router.post('/api/sauces/:id/like', sauceCtrl.likes);


module.exports = router;


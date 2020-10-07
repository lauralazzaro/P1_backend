const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauceCtrl');
const multer = require('../middleware/multer-config');

router.get('', sauceCtrl.getAllSauces);
router.get('/:id', sauceCtrl.getOneSauce);
router.post('', multer, sauceCtrl.createSauce);
router.put('/:id', multer, sauceCtrl.updateSauce);
router.delete('/:id', sauceCtrl.deleteSauce);
router.post('/:id/like', sauceCtrl.likes);

module.exports = router;


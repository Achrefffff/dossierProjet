const express = require('express');
const formuleCtrl = require('../controllers/formules');
const e = require('express');

let router = express.Router();
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Cocktail Time:', event.toString())
    next()
})
router.get('/', formuleCtrl.getAllFormule);
router.get('/:id', formuleCtrl.getFormule);
router.post('/', formuleCtrl.createFormule);
router.patch('/:id', formuleCtrl.updateFormule);
router.delete('/:id', formuleCtrl.deleteFormule);
module.exports = router;
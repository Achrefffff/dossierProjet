const express = require('express');
const aboutCtrl = require('../controllers/apropos');

let router = express.Router();
router.use( (req, res, next) => {
    const event = new Date()
    console.log('Cocktail Time:', event.toString())
    next()
})


router.get('/', aboutCtrl.getAllAbout);

router.get('/:id', aboutCtrl.getAbout);
router.post('/', aboutCtrl.createAbout);
router.patch('/:id', aboutCtrl.updateAbout);
router.delete('/:id', aboutCtrl.deleteAbout);

module.exports = router;
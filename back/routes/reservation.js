const express   = require('express');
const reservationCtrl = require('../controllers/reservation');

let router = express.Router();

router.get('/', reservationCtrl.getAllReservation);
router.get('/:id', reservationCtrl.getReservation);
router.post('/', reservationCtrl.createReservation);
router.patch('/:id', reservationCtrl.updateReservation);
router.delete('/:id', reservationCtrl.deleteReservation);

module.exports = router;
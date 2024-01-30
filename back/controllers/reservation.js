const DB = require('../db.config');
const Reservation = DB.reservation;

exports.getAllReservation = (req, res) => {
    Reservation.findAll()
        .then(reservation => res.json({ data: reservation }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
}
exports.getReservedDates = (req, res) => {
    Reservation.findAll({
      attributes: ['date', 'heure'],
    })
    .then(reservations => {
      const reservedDates = reservations.map(reservation => ({
        date: reservation.date,
        heure: reservation.heure,
      }));
      res.json({ data: reservedDates });
    })
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }));
  };
  
exports.getReservation = async (req, res) => {
    let reservationId = parseInt(req.params.id);

    if (!reservationId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        let reservation = await Reservation.findOne({
            where: { id: reservationId },
            attributes: ['id', 'nom', 'prenom', 'telephone', 'date', 'heure', 'message']
        });

        if (reservation === null) {
            return res.status(404).json({ message: 'This reservation does not exist!' });
        }

        return res.json({ data: reservation });
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}

exports.createReservation = (req, res) => {
    console.log('Request body:', req.body);

    if (!req.body.nom || !req.body.prenom || !req.body.telephone || !req.body.date || !req.body.heure || !req.body.message) {
        return res.status(400).json({ message: 'Missing parameters' });
    }
    console.log('Creating reservation...LOADING...');
    Reservation.create(req.body)
    .then(reservation => {
        console.log('Reservation ok:', reservation);
        res.status(201).json({ data: reservation });
    })

    .catch(err => {
        console.log('Database Error:', err);
        res.status(500).json({ message: 'Database Error', error: err });
    });
}

exports.updateReservation = async (req, res) => {
    let reservationId = parseInt(req.params.id);

    if (!reservationId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        let reservation = await Reservation.findOne({
            where: { id: reservationId },
            attributes: ['id', 'nom', 'prenom', 'telephone', 'date', 'heure', 'message']
        });

        if (reservation === null) {
            return res.status(404).json({ message: 'This reservation does not exist!' });
        }

        reservation.update(req.body, { where: { id: reservationId } })
            .then(reservation => res.json({ message: 'Reservation Updated', data: reservation }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}

exports.deleteReservation = async (req, res) => {
    let reservationId = parseInt(req.params.id);

    if (!reservationId) {
        return res.status(400).json({ message: 'Missing Parameter' });
    }

    try {
        let reservation = await Reservation.findOne({
            where: { id: reservationId },
            attributes: ['id', 'nom', 'prenom', 'telephone', 'date', 'heure', 'message']
        });

        if (reservation === null) {
            return res.status(404).json({ message: 'This reservation does not exist!' });
        }

        reservation.destroy({ where: { id: reservationId } })
            .then(reservation => res.json({ message: 'Reservation Deleted', data: reservation }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
    } catch (err) {
        return res.status(500).json({ message: 'Database Error', error: err });
    }
}

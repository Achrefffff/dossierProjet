const express = require('express');
const authCtrl = require('../controllers/auth');
const {signUplimiter} = require('../rate/limiter');

let router = express.Router();
router.use((req, res, next) => {
    const event = new Date();
    console.log('AUTH Time:', event.toString());
    next();
});

router.use(signUplimiter);
router.post('/login', authCtrl.login);

module.exports = router;

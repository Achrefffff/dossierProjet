const rateLimiter = require('express-rate-limit');

const signUplimiter = rateLimiter({
    max:5,
    windowMs:10*60*1000,
    message: "trop de  requests, please essaye later"
});

const generalLimiter = rateLimiter({
    max:5,
    windowMs:5000,
    message: "trop de  requests, please essaye later",
    standardHeaders: false,
    legacyHeaders: false
});

module.exports = {signUplimiter,generalLimiter};

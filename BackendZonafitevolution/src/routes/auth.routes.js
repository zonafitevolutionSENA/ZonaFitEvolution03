const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const rateLimit = require('express-rate-limit');

const limitelogin = rateLimit ({
    windowMs: 15 * 60 * 1000,
    limit: 8,
    skipSuccessfulRequests: true,
    handler: (req, res) =>

        res.status(429).json({error: 'Demasiados intentos. Vuelve a intentarlo de nuevo dentro de 15 minutos'
        }),
});
router.post('/login',limitelogin, authController.login);

module.exports = router;

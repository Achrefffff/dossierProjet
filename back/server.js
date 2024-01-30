const express = require('express');
const cors = require('cors');
const checkTokenMiddleware = require('./jsonwebtoken/check');
const path = require('path');
const{generalLimiter} = require('./rate/limiter');
const helmet = require('helmet');
let DB = require('./db.config')

/*****************************/
/*** Initialisation de l'API */
const app = express()
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(__dirname + '/uploads'));
/*** Import des modules de routage */
const user_router = require('./routes/users');
const cocktail_router = require('./routes/cocktails');
const auth_router = require('./routes/auth');
const apropos_router = require('./routes/apropos');
const reservation_router = require('./routes/reservation');
const formules_router = require('./routes/formules');
/*** Mise en place du routage */
app.use(generalLimiter)
app.get('/', (req, res) => res.send(`I'm online. All is OK !`))
app.use('/users',user_router)
app.use('/cocktails', cocktail_router)
app.use('/auth', auth_router)
app.use('/about', apropos_router)
app.use('/reservation', reservation_router)
app.use('/formules', formules_router)
app.get('*', (req, res) => res.status(501).send('encore des problèmes'))

/*** Start serveur avec test DB */
DB.sequelize.authenticate()
  .then(() => {
    console.log('Database OK');
    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Le serveur tourne sur le port ${process.env.SERVER_PORT}`);
    });
  })
  .catch(err => console.log('Database Error', err));
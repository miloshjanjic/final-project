require('../../db/index');
const express = require('express');
const cors = require('cors');
const jwt = require('express-jwt');
const config = require('../../config/index');

const api = express();
const usersRoutes = require('./router');

api.use(express.json());
api.use(cors());

api.use(jwt({
  secret: config.get('auth').jwt_key,
  algorithms: ['HS256']
}).unless({
  path: [
    '/users/register',
    '/users/login',
  ]
}));

api.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({
      error: true,
      message: 'You need to log in in order to perform this action'
    });
  }
});

api.use('/users', usersRoutes);

const PORT = process.env.PORT || config.get('ports').users;

api.listen(PORT, err => {
  if (err) {
    return console.log('Error happened while starting the users service: ', err);
  }
  console.log('Users service successfully started on port:', PORT);
});
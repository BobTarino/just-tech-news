// this index prefixes the endpoints of the apis
const router = require('express').Router();

const userRoutes = require('./user-routes.js');

router.use('/users', userRoutes);

module.exports = router;
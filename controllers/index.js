// this index collects packaged group of API endpoints and prefixes them with path /api
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// for endpoints that don't exist 
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
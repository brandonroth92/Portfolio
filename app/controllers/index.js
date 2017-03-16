var express = require('express');
var router = express.Router();
var path = require('path');

// require api router for /api route
router.use('/api', require('./api'));

// serve angular front end files from root path
router.use('/', express.static('app', { redirect: false }));

router.get('*', function (req, res) {
  res.sendFile(path.resolve('public/views/rendered/index.html'));
});

module.exports = router;
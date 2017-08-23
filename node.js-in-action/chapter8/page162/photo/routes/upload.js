var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload', {title: 'Photo upload'});
});

module.exports = router;
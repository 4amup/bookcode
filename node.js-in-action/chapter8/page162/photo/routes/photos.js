const express = require('express');
const router = express.Router();
const Photo = require('../model/Photo')

/* 列表路由 */
router.get('/', function(req, res, next) {
  Photo.find({}, (err, photos) => {
    if (err) return next(err)
    res.render('photos', {
      title: 'Photos',
      photos: photos
    })
  })
});

module.exports = router;
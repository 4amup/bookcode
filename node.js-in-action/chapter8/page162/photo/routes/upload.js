const express = require('express');
const router = express.Router();
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

/* GET upload page. */
router.get('/', function (req, res, next) {
  res.render('upload', {title: 'Photo upload'});
});

// 上传
router.post('/', function (req, res, next) {
  let form = new formidable.IncomingForm()
  form.uploadDir = "../images"
  form.parse(req, (error, field, files) => {
    if (error) throw error
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.write('received upload')
    res.end(fields, files)
  })
})
module.exports = router;
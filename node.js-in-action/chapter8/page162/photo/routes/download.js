const router = require('express').Router()
let Photo = require('../model/Photo')
const path = require('path')

router.get('/:id/download', (req, res, next) => {
  let id = req.params.id
  Photo.findById(id, (err, photo) => {
    if (err) return next(err)
    // 构造了一个绝对路径
    let filepath = path.join(__dirname.substr(0, __dirname.length-6), 'public/' + photo.path)
    res.sendFile(filepath)
  })
})

module.exports = router
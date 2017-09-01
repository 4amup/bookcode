const router = require('express').Router()
const Entry = require('../lib/entry')

// get的函数
function form (req, res, next) {
  res.render('post', {
    title: 'Post form',
    locals: res.locals
  });
}

// 提交post的函数
function submit (req, res, next) {
  let data = req.body.entry

  let entry = new Entry({
    "username": res.locals.user.name,
    "title": data.title,
    "body": data.body
  })

  entry.save(err => {
    if (err) return next(err)
    res.redirect('/')
  })
}

router.get('/', form)

// router.get('/', form)
router.post('/', submit)

module.exports = router
const router = require('express').Router()
const User = require('../lib/user')

// get register 页面
router.get('/', (req, res, next) => {
  res.render('login', {
    title: 'Login',
    locals: res.locals
  })
  res.locals.removeMessages()
})

// post 表单注册
router.post('/', (req, res, next) => {
  let data = req.body.user
  User.authenticate(data.name, data.pass, function (err, user) {
    if (err) return next(err)
    if (user) {
      req.session.uid = user.id // 为认证储存uid
      res.redirect('/')
    } else {
      res.error("Sorry! invalid credentials.")
      res.redirect('back')
    }
  })
})
module.exports = router
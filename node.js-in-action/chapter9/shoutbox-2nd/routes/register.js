const router = require('express').Router()
const User = require('../lib/user')

// get register 页面
router.get('/', (req, res, next) => {
  res.render('register', {
    title: 'Register',
    locals: res.locals
  })
  res.locals.removeMessages()  
})

// post 表单注册
router.post('/', (req, res, next) => {
  let data = req.body.user
  User.getByName(data.name, (err, user) => {
    if (err) return next(err)
    // redis will default ti
    if (user.id) { // 注册用户名已经被占用
      res.error('Username already taken!')
      console.log('Username already taken!')
      res.redirect('back') // 后退到注册页面
    } else {
      user = new User({
        name: data.name,
        pass: data.pass
      })
      // 保存新用户
      user.save(err => {
        if (err) return next(err)
        req.session.uid = user.id // 为认证保存uid
        console.log(`${data.name}注册成功！`)
        res.redirect('/') // 重定向到首页
      })
    }
  })
})
module.exports = router
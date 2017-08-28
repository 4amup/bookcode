const router = require('express').Router()

// get register 页面
router.get('/', (req, res, next) => {
  res.render('register', { title: 'Register' })
})

// post 表单
router.post('/', (req, res, next) => {

})
module.exports = router
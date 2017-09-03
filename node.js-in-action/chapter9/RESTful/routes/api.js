const router = require('express').Router()
const User = require('../lib/user') // 引入用户模型

function user () {
  //
}

function entries () {
  //
}

function add () {
  //
}

// 这个添加的认证方法需要暴露在app.js中
router.auth = function () {
  //
}

// 路由
router.get('/user/:id', user)
router.get('/entries/:page?', entries)
router.post('/entry', add)

module.exports = router
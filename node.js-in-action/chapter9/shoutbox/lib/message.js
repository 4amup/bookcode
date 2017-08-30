// 此中间件是为了扩展response的原型
const express = require('express')
let res = express.response // express.response对象是给响应对象用的原型

// 为response添加方法意味着所有中间件和路由都能访问他们
res.message = function (msg, type) {
  type = type || 'info'
  let sess = this.req.session // session取出来
  sess.message = sess.message || [] // 默认取空数组
  sess.message.push({type: type, string: msg})
}

// 错误消息的处理
res.error = function (msg) {
  return this.message(msg, 'error')
}

// 输出中间件
module.exports = function (req, res, next) {
  res.locals.message = req.session.message || []
  res.locals.removeMessages = function () {
    req.session.message = []
  }
  next()
}
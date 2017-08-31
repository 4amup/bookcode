// 自定义的中间件
const User = require('../user')

// 将res.locals.user设置好
module.exports = function (req, res, next) {
  let uid = req.session.uid
  if (!uid) return next()
  User.get(uid, (err, user) => { // 从redis中取出已经登录的用户的数据
    if (err) return next(err)
    req.user = res.locals.user = user // 将用户数据输出到响应对象上
    next()
  })
}
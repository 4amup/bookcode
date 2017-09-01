module.exports = function (fn, perpage) {
  perpage = perpage || 10 // 默认每页显示10条记录
  return function (req, res, next) {
    let page = Math.max(parseInt(req.param('page') || '1', 10), 1) - 1 // 将参数page解析为整数

    // 调用传入函数
    fn(function (err, total) {
      if (err) return next(err)

      req.page = res.locals.page = { // 保存page属性以便将来使用
        number: page,
        perpage: perpage,
        from: page * perpage,
        to: page * perpage + perpage - 1,
        total: total,
        count: Math.ceil(total / perpage)
      }
      next() // 将控制权交给下一个中间件
    })
  }
}
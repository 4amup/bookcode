module.exports = function (fn, perpage) {
  perpage = perpage || 10 // 默认每页显示10条记录
  return function (req, res, next) {
    let page = Math.max(parseInt(req.param('page') || '1', 10), 1) - 1 // 将参数page解析为整数

    // 调用传入的取entry总数的函数
    fn(function (err, total) {
      if (err) return next(err)

      req.page = res.locals.page = { // 保存page属性以便将来使用
        number: page, // 页码
        perpage: perpage, // 每页显示数
        from: page * perpage, // 单页第一条消息序号
        to: page * perpage + perpage - 1, // 单页最后一条消息序号
        total: total, // 消息总条数
        count: Math.ceil(total / perpage) // 总页数
      }
      next() // 将控制权交给下一个中间件
    })
  }
}
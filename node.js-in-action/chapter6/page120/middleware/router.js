const parse = require('url').parse

module.exports = function route (obj) {
  return function (req, res, next) {
    if (!obj[req.method]) { // 检查req.method是否是get或delete
      next() // 如果未定义，调用next
      return // 并停止一切后续操作
    }

    let routes = obj[req.method] // 查找req.method对应的路径
    let url = parse(req.url) // 解析成一个url对象了，用于和pathname匹配
    let paths = Object.keys(routes) // 路径数组

    paths.forEach((path, index) => {
      let fn = routes[path]
      path = path
        .replace(/\//g, '\\/') // 将所有/换成\/
        .replace(/:{\w+}/g, '([^\\/]+)')
      // 构造正则表达式
      let re = new RegExp('^' + path + '$')
      // 尝试和pathname匹配
      let captures = url.pathname.match(re) // 返回的是一个可以匹配的数组
      if (captures) {
        let args = [req, res].concat(captures.slice(1))
        fn.apply(null, args)
        return // 当有想匹配的函数时，返回，防止后续的next调用
      }
    })
    next()
  }
}
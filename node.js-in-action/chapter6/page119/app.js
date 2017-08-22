const connect = require('connect')

let app = connect()

app.use(setup(':method :url'))
app.use(hello)
app.listen(3000, () => {console.log('http://localhost:3000')})

// 日志中间件
function setup(format) {
  let regexp = /:{\w+}/g
  return function logger (req, res, next) {
    // 正则表达式格式化日志
    let str = format.replace(regexp, function(match, property) {
      return req[property]
    })
    console.log(str) // 将日志条目输出到控制台
    next() // 将控制权交给下一个中间件组件
  }
}

function hello(req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
}
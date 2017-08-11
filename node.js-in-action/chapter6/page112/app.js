const connect = require('connect')
const app = connect()

// 使用中间件
app.use(logger)
app.use(hello)

// 监听3000端口
app.listen(3000, () => {
  console.log('http://localhost:3000')
})

// 做日志的中间件
function logger (req, res, next) {
  console.log('%s %s', req.method, req.url)
  next()
}

// 响应hello world的中间件
function hello (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello world')
}
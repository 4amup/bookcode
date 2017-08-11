const connect = require('connect')
const app = connect()

// 使用中间件
app.use(logger)
app.listen(3000, () => {
  console.log('http://localhost:3000')
})

// 做日志的中间件
function logger (req, res, next) {
  console.log('%s %s', req.method, req.url)
  next()
}
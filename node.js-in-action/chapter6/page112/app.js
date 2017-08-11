const connect = require('connect')
const app = connect()

// 使用中间件
app.use(logger)
app.use('/admin', restrict)
app.use('/admin', admin)
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

// Basic认证的中间件
function restrict(req, res, next) {
  let authorization = req.headers.authorization
  if (!authorization) return next(new Error('Unauthorized'))

  let parts = authorization.split(' ')
  let scheme = parts[0]
  let auth = new Buffer(parts[1], 'base64').toString().split(':')
  let user = auth[0]
  let pass = auth[1]

  authenticcateWithDatabase(user, pass, err => {
    if (err) return next(err) // 告诉分配器出错了
    
    next() // 如果认证完成，不带参数调用next
  })
}

// 显示管理面板的中间件
function admin(req, res, next) {
  switch (req.url) {
    case '/':
      res.end('try /users')
      break
    case '/users':
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(['mobi', 'pdf', 'txt']))
  }
}

// 模拟一个数据库认证
function authenticcateWithDatabase (user, pass, callback) {
  //
}
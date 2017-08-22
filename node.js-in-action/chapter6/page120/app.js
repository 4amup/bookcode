const connect = require('connect')
const router = require('./middleware/router')

let routes = { // 定义路由对象
  GET: {
    '/users': function (req, res) {
      res.end('tobi, loki, ferret')
    },
    '/user/:id': function (req, res, id) { // 其中的每一项都是对请求URL的映射，并包含要调用的回调函数
      res.end(`user ${id}`)
    }
  },
  DELETE: {
    'user/:id': function (req, res, id) {
      res.end(`deleted user ${id}`)
    }
  }
}

let app = connect()
app.use(router(routes)) // 类似于setup的函数，即返回函数的函数
app.listen(3000, () => {console.log('http://localhost:3000')})
// 这个应用准备用最新的无“;”结尾的编码规范写
const express = require('express')
  , nunjucks = require('nunjucks') 

// 创建express实例
let app = express()

// 配置模板引擎，使用nunjucks更有前途
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.set('view engine', 'njk')

// 路由配置-首页
app.get('/', (req, res, next) => {
  res.render('index')
})
// 路由配置-创建商品
app.post('/create', (req, res, next) => {
  //
})
// 路由配置-查看商品
app.get('/item/:id', (req, res, next) => {
  res.render('item')
})
// 路由配置-创建商品评价
app.post('/item/:id/review', (req, res, next) => {
  //
})

// 监听
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
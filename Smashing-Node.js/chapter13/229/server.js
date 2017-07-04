const express = require('express')
  , nunjucks = require('nunjucks')
  , sequelize = require('sequelize')

// 创建express实例
let app = express()

// 配置应用
nunjucks.configure('views', {
  autoescape: true,
  express: app
})
app.set('view engine', 'njk')

// 中间件
app.use(express.static('public'))

// 首页路由
app.get('/', (req, res, next) => {
  res.render('index')
})

// 删除项目路由
app.delete('/project/:id', (req, res, next) => {
  //
})

// 创建项目路由
app.post('/projects', (req, res, next) => {
  //
})

// 展示指定项目中的任务
app.get('/project/:id/tasks', (req, res, next) => {
  //
})

// 为指定项目添加任务
app.post('/project/:id/tasks', (req, res, next) => {
  //
})

// 删除任务路由
app.delete('/task/:id', (req, res, next) => {
  //
})

// 监听
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
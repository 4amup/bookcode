// 这个应用准备用最新的无“;”结尾的编码规范写
const express = require('express')
  , nunjucks = require('nunjucks')
  , bodyParser = require('body-parser')
  , mysql = require('mysql')
  , config = require('./config')

// 创建express实例
let app = express()

// 使用中间件
app.use(express.static(__dirname + '/views'))
app.use(bodyParser.urlencoded({ extended: true }));

// 配置模板引擎，使用nunjucks更有前途
nunjucks.configure('views', {
    autoescape: true,
    express: app
})
app.set('view engine', 'njk')

// 路由配置-首页
app.get('/', (req, res, next) => {
  connection.query(`select id, title, description from item`, (err, results) => {
    res.render('index', {items: results})
  })
})
// 路由配置-创建商品
app.post('/create', (req, res, next) => {
  connection.query(`
  insert into item
  (title, description)
  value
  ('${req.body.title}', '${req.body.description}')
  `, (err, info) => {
    if(err) return next(err)
    console.log(`item created with id ${info.insertId}`)
    res.redirect('/')
  })
})

// 路由配置-查看商品
app.get('/item/:id', (req, res, next) => {
  function getItem (fn) {
    connection.query(`
    select id, title, description
    from item
    where id = '${req.params.id}'
    `, (err, results) => {
      if(err) return next(err)
      if(!results[0]) return res.send(404)
      fn(results[0])
    })
  }

  function getReviews (item_id, fn) {
    connection.query(`
    select text, stars
    from review
    where item_id = '${item_id}'
    `, (err, results) => {
      if(err) return next(err)
      fn(results)
    })
  }

  getItem((item) => {
    getReviews(item.id, (reviews) => {
      res.render('item', {item: item, reviews: reviews})
    })
  })
})
// 路由配置-创建商品评价
app.post('/item/:id/review', (req, res, next) => {
  connection.query(`
  insert into review
  (item_id, stars, text)
  value
  ('${req.params.id}', '${req.body.stars}', '${req.body.review}')
  `, (err, info) => {
    if(err) return next(err)
    console.log(`review created with id ${info.insertId}`)
    res.redirect(`/item/${req.params.id}`)
  })
})

// 连接数据库
let connection = mysql.createConnection(config)
// 监听
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
// 引入依赖
const express = require('express'),
      mongodb = require('mongodb'),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks'),
      assert = require('assert');

// 实例化express
let app = express();


// 中间件
app.use(bodyParser.urlencoded({ extended: true }));

// 模板引擎配置
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk'); //配置文件扩展名为njk

// 普通get路由
app.get('/', (req, res) => {
  res.render('index', {authenticated: false});
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});

// 处理post路由
app.post('/signup', (req, res, next) => {
  app.users.insert(req.body.user, (err, doc) => {
    if(err) return next(err);
    res.redirect('/login/' + doc.ops[0].email);
  })
});

// 连接数据库
let MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/test'; 
MongoClient.connect(url, function(err, db) {
  console.log("连接成功！");
  // 设定快捷方式来连接
  app.users = db.collection('users');  
  // 监听端口
  // 放在这里是因为，数据库没有连接成功的话，不允许在线打开
  app.listen(3000, () => {
    console.log('http://localhost:3000');
  });
});
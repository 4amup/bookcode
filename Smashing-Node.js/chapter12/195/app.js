// 引入依赖
const express = require('express'),
      mongodb = require('mongodb'),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks');

// 实例化express
let app = express();

// 中间件


// 模板引擎配置
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk'); //配置文件扩展名为njk

// 路由
  // 默认路由
app.get('/', (req, res) => {
  res.render('index', {authenticated: false});
});
  // 登陆路由
app.get('/login', (req, res) => {
  res.render('login');
});
  // 注册路由
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
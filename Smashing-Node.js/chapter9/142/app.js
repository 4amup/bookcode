const express = require('express'),
      search = require('./search'),
      nunjucks = require('nunjucks');

// 实例化app
let app = express();

// 模板引擎配置 
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// 配置模板文件后缀为njk
app.set('view engine', 'njk');

// 路由
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/search', (req, res, next) => {
  search(req.query.q, (err, books) => {
    if(err) return next(err);
    res.render('search', {search: req.query.q, books: books});
  });
});

// 监听端口
app.listen(3000);
console.log('http://localhost:3000');
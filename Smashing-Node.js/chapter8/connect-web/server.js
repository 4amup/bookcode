const connect = require('connect');
const static = require('serve-static');
const morgan = require('morgan');

let app = connect();

// 记录日志
// app.use((req, res, next) => {
//   console.error(' %s %s ', req.method, req.url);
//   next();
// });
app.use(morgan('dev'));

// 图片托管服务
app.use((req, res, next) => {
  if('GET' === req.method && '/images' === req.url.substr(0, 7)) {
    // 图片托管
  } else {
    // 交给其他中间件处理
    next();
  }
});

// index.html文件
app.use((req, res, next) => {
  if('GET' === req.method && '/' === req.url) {
    // 响应index.html
  } else {
    // 交给其他中间件处理
    next();
  }
});

app.use((req, res, next) => {
  // 这是最后一个中间件，如果到了这里吃，就意味着无能为力
  res.writeHead(404);
  res.end('Not found');
});

app.listen(3000);

console.log('server run at http://localhost:3000');
const connect = require('connect'),
      time = require('./request-time'),
      morgan = require('morgan');

let app = connect();

// morgan记录中间件
app.use(morgan('dev'));

// 自定义的超时中间件
app.use(time({time: 500}));

// 快速响应的中间件
app.use((req, res, next) => {
  if('/a' === req.url) {
    res.writeHead(200);
    res.end('Fast!');
  } else {
    next();
  }
});

// 模拟服务器的慢速响应
app.use((req, res, next) => {
  if('/b' === req.url) {
    setTimeout(() => {
      res.writeHead(200);
      res.end('Slow!');
    }, 2000);
  } else {
    next();
  }
});

app.listen(3000);

console.log('server run at http://localhost:3000');
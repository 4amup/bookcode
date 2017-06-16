const http = require('http'),
      fs = require('fs');

let server = http.createServer((req, res) => {
  // 根据url和type，通过fs系统返回res数据
  function serve(path, type) {
    res.writeHead(200, {'Content-Type': type});
    fs.createReadStream(path).pipe(res);
  }
  // /index.html请求
  if('GET' === req.method && '/' === req.url) {
    serve(__dirname + '/index.html', 'text/html')
  } else if ('GET' === req.method && '/images' === req.url.substr(0, 7) && '.jpg' === req.url.substr(-4)) {
    // /images/x.jpg请求
    fs.stat(__dirname + req.url, (err, stat) => {
      if(err || !stat.isFile()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
    });
    serve(__dirname + req.url, 'application/jpg' );
  } else if('GET' === req.method && '/css' === req.url.substr(0, 4) && '.css' === req.url.substr(-4)) {
    // /css/xxx.css请求
    fs.stat(__dirname + req.url, (err, stat) => {
      if(err || !stat.isFile()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
    });
    serve(__dirname + req.url, 'text/css' );
  } else {
    // 如果全不是，返回404错误
    res.writeHead(404);
    res.end('Not Found');
  };
});

server.listen(3000);
console.log('server run at http://localhost:3000');
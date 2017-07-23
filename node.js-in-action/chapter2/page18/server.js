const http = require('http');

const fs = require('fs');

const path = require('path');

// 可以根据文件扩展名得到MIME类型
const mime = require('mime');

// 存放缓存文件内容的对象
let cache = {};

// 在文件不存在时发送404错误
function send404(response, err) {
  response.writeHead(404, {'Content-Type': 'text/plain'});
  response.write(`${err}`);
  response.end();
}

// 提供文件数据服务
function sendFile(response, filePath, fileContents) {
  // path.basename返回路径的最后一部分，path.basename('/foo/bar/baz/asdf/quux.html')，返回: 'quux.html'
  response.writeHead(200,{"Content-Type": mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

// 确认文件是否缓存在内存中了，有就返回，没有就从文件系统读取
function serverStatic(response, cache, absPath) {
  if(cache[absPath]) { // 检查是否已经缓存在内存中了
    sendFile(response, absPath, cache[absPath]); // 如果缓存了，直接返回数据
  } else {
    fs.readFile(absPath, (err, data) => {
      if(err) {send404(response, err)}
      cache[absPath] = data;
      sendFile(response, absPath, data);
    });
  }
}

var server = http.createServer((request, response) => {
  let filePath = false;

  if(request.url === '/') {
    filePath = 'public/index.html'
  } else {
    // 转url路径为文件相应路径
    filePath = `public${request.url}`;
  }
  let absPath = `./${filePath}`;
  // 返回静态文件
  serverStatic(response, cache, absPath);
});

server.listen(3000, () => {
  console.log("server listening at http://localhost:3000");
});
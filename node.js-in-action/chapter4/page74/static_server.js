const http = require('http'),
      parse = require('url').parse,
      join = require('path').join,
      fs = require('fs')

// __dirname是一个神奇的变量，他的值是该文件所在目录的路径
let root = __dirname

// 创建服务器
let server = http.createServer((req, res) => {
  // 得到解析的url对象
  let url = parse(req.url)
  let path = join(root, url.pathname) //通过url得到文件路径

  // 检查文件是否存在，并在响应中提供Content-Length
  fs.stat(path, (err, stats) => {
    if (err) {
      if ('ENOENT' === err.code) {
        res.statusCode = 404
        res.end('Not Found')
      } else {
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    } else {
      res.setHeader('Content-Length', stats.size)
      let stream = fs.createReadStream(path)
      stream.pipe(res)
      stream.on('error', (err) => {
        res.statusCode = 500
        res.end('Internal Server Error')
      })
    }
  })
})

// 监听3008端口
server.listen(3008)
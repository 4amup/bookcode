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
  let path = join(root, url.pathname)
})

// 监听3008端口
server.listen(3008)
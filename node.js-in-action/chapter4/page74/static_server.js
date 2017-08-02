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
  let stream = fs.createReadStream(path)
  stream.on('data', (chunk) => {
    res.write(chunk)
  })
  stream.on('end', () => {
    res.end()
  })
})

// 监听3008端口
server.listen(3008)
const http = require('http'),
      url = require('url')

let items = []

// 创建服务器
let server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST': {
      // 为这个post设置缓存
      let item = ''
      req.setEncoding('utf8')
      req.on('data', chunk => {
        // 将数据块拼接到缓存上
        item += chunk
      })
      req.on('end', () => {
        items.push(item)
        res.end('OK\n')
      })
      break
    }
    case 'GET': {
      items.forEach((item, index) => {
        res.write(`${index}) ${item}\n`)
      })
      res.end()
      break
    }
  }
})

server.listen(3008, () => {
  console.log('run at http://localhost:3008')
})
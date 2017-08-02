const http = require('http')

let server = http.createServer((req, res) => {
  let url = 'http://baidu.com'
  let body = `<p>Redirecting to <a href=${url}>${url}</a></p>`
  res.setHeader('Location', url)
  res.setHeader('Content-Length', body.length)
  res.setHeader('Content-Type', 'text/html')
  // 302-（临时移动）-服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求
  res.statusCode = 302
  res.end(body)
})

server.listen(3008, () => {
  console.log('run at http://localhost:3008')
})
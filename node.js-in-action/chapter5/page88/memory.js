const http = require('http')

let counter = 0

// 启动服务器并对所有访问计数
let server = http.createServer((req, res) => {
  counter++
  res.write('I have been accessed ' + counter + 'times.') // 次数
  res.end()
})
.listen(8888, () => {console.log('run at http://localhost:8888')})
const http = require('http')
const fs = require('fs')

// 三层回调的例子
http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./title.json', (err, data) => {
      if (err) {
        console.error(err)
        res.end('Server Error')
      } else {
        let titles = JSON.parse(data.toString()) // 读取数组数据

        // 读取HTML模板
        fs.readFile('./template.html', (err, data) => {
          if (err) {
            console.error(err)
            res.end('Server Error')
          } else {
            let tmpl = data.toString()

            let html = tmpl.replace('%', titles.join('</li><li>'))
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.end(html)
          }
        })
      }
    })
  }
})
.listen(8000, () => {
  console.log('run at http://localhost:8000')
})
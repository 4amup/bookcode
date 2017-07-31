const http = require('http')
const fs = require('fs')

// 使用函数优化回调的例子
http.createServer((req, res) => {
  // 控制权交给了getTitles函数
  getTitles(res)
})
.listen(8000, () => {
  console.log('run at http://localhost:8000')
})

function getTitles (res) {
  fs.readFile('./title.json', (err, data) => {
    if (err) {
      HadError(err, res)
    } else {
      let titles = JSON.parse(data.toString()) // 读取数组数据
      // 获取标题后，传参并将控制权交给getTemplate
      getTemplate(titles, res)
    }
  })
}

function getTemplate (titles, res) {
  fs.readFile('./template.html', (err, data) => {
    if (err) {
      HadError(err, res)
    } else {
      let tmpl = data.toString()
      // 读取玩html文件后，将控制权交给formatHtml
      formatHtml(titles, tmpl, res)
    }
  })
}

function formatHtml(titles, tmpl, res) {
  // formatHtml得到标题和模板，渲染后交给客户端
  let html = tmpl.replace('%', titles.join('</li><li>'))
  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end(html)
}

// 错误处理，向客户端返回“server error”
function HadError (err, res) {
  console.error(err)
  res.end('Server Error')
}
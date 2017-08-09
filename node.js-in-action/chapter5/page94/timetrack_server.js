const http = require('http'),
      mysql = require('mysql'),
      work = require('./lib/timetrack')

// 数据库配置
const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '8307',
  database : 'timetrack'
})
// 连接数据库，有错误处理
db.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } 
  console.log('connected as id ' + db.threadId);
})

// 创建服务器
let server = http.createServer((req, res) => {
  switch (req.method) {
    case 'POST':
      switch (req.url) {
        case '/':
          work.add(db, req, res)
          break
        case '/archive':
          work.archive(db, req, res)
          break
        case '/delete':
          work.delete(db, req, res)
          break
      }
      break
    case 'GET':
      switch (req.url) {
        case '/':
          work.show(db, res)
          break
        case '/archived':
          work.showArchived(db, res)
          break
      }
      break
  }
})

// 使用这个数据库
db.query(`USE timetrack`);

// 建表后通过回调函数启动服务器
db.query(`CREATE TABLE IF NOT EXISTS work(
  id INT(10) NOT NULL AUTO_INCREMENT,
  hours DECIMAL(5,2) DEFAULT 0,
  date DATE,
  archived INT(1) DEFAULT 0,
  description LONGTEXT,
  PRIMARY KEY (id))`, err => {
    if (err) throw err
    server.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  }
)
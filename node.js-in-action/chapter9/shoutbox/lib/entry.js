// 创建消息模型
const redis = require('redis')
let db = redis.createClient()

// 监听数据库错误
db.on('error', err => {
  console.log("Error " + err)
})

// 数据库连接成功提示
db.on('connect', () => {
  console.log('redis_message数据库已连接')
})

module.exports = Entry

// 先写出构造函数
function Entry (obj) {
  for (let key in obj) {
    this[key] = obj[key]
  }
}

// 接下来添加方法
Entry.prototype.save = function (cb) {
  let entryJSON = JSON.stringify(this) // 将保存的消息转换成JSON字符串
  db.lpush('entries', entryJSON, err => { // 使用链表保存
    if (err) return cb(err)
    cb()
  })
}

// 获取一部分消息的逻辑
Entry.getRange = function (from, to, cb) {
  db.lrange('entries', from, to, function (err, items) {
    if (err) return cb(err)
    let entries = []

    items.forEach(item => {
      entries.push(JSON.parse(item)) // 解码JSON格式的消息记录
    })
    cb(null, entries)
  })
}
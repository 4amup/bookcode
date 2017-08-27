const redis = require('redis')
const crypto = require('crypto')
const db = redis.createClient()

db.on('error', err => {
  console.log(`Error ${err}`)
})
db.on('connect', () => {
  console.log('redis数据库已连接')
})

// 构造函数的一般形式
// function User (name) {
//   this.name = name
// }
// var user = new User('user1')

function User (obj) { // 输出User构造函数
  // 由于键值对是不确定的，于是遍历
  for (var key in obj) { // 遍历传入对象中的键
    this[key] = obj[key] // 合并值，这里的this是即将new出来的user
  }
}

User.prototype.save = function (cb) {
  // 这里的this代表的是实例对象的值
  if (this.id) { // 如果用户已经存在
    this.update(cb)
  } else {
    let user = this
    db.incr('user:ids', (err, id) => { // 创建唯一id
      if (err) return cb(err)
      user.id = id // 设定id，以便保存
      user.hashPassword(err => {
        if (err) return cb(err)
        user.update(cb) // 更新用户属性
      })
    })
  }
}

// 创建
User.prototype.update = function (cb) {
  let user = this
  let id = user.id
  db.set('user:id:' + user.name, id, err => { // 用名称索引用户id
    if (err) return cb(err)
    db.hmset('user:' + id, user, err => { // 用Redis哈希储存数据
      cb(err)
    })
  })
}

// 加密密码
User.prototype.hashPassword = function (cb) {
  let user = this
  crypto.pbkdf2(user.pass, 'salt', 100000, 512, 'sha512', (err, derivedKey) => {
    if (err) throw err
    console.log(derivedKey.toString('hex'))
    user.pass = derivedKey
    cb()
  })
}

// 测试用户保存逻辑
let tobi = new User({
  name: 'Tobi',
  pass: `I'm a ferret`,
  age: '2'
})

tobi.save(err => {
  if (err) throw err
  console.log(`user id ${tobi.id}`)
})

module.exports = User
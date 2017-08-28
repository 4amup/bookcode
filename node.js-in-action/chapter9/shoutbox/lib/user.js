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
    // 对存储在指定key的数值执行原子的加1操作。
    // 如果指定的key不存在，那么在执行incr操作之前，会先将它的值设定为0。
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
// let tobi = new User({
//   name: 'Tobi',
//   pass: `I'm a ferret`,
//   age: '2'
// })

// tobi.save(err => {
//   if (err) throw err
//   console.log(`user id ${tobi.id}`)
// })
User.getByName = function (name, fn) {
  User.getId(name, function (err, id) { // 根据名称查找用户
    if (err) return fn(err)
    User.get(id, fn) // 用ID抓取用户
  })
}

User.getId = function (name, fn) {
  db.get('user:id' + name, fn) // 取得由名称索引的ID
}

User.get = function (id, fn) {
  db.hgetall('user:' + id, function (err, user) {
    if (err) return fn(err)
    fn(null, new User(user)) // 将普通对象转换成新的User
  })
}

// 认证
User.anthenticate = function (name, pass, fn) {
  User.getByName(name, function (err, user) { // 通过名称查找用户
    if (err) return fn(err)
    if (!user.id) return fn() // 用户不存在
    // 以相同方式对密码做加盐处理
    crypto.pbkdf2(pass, 'salt', 100000, 512, 'sha512', (err, derivedKey) => {
      if (err) return fn(err)
      if (derivedKey === user.pass) return fn(null, user) // 匹配发现项
      fn()
    })
  })
}

module.exports = User
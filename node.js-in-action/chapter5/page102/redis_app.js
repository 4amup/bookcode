const redis = require('redis')
// client继承了EventEmitter的行为
let client = redis.createClient(6379, 'localhost')

client.on('error', err => {
  console.log(err)
})

// 插入值，另外print函数输出操作的结果或出错时提示
client.set('color', 'red', redis.print) // Reply: OK
// 获取值
client.get('color', (err, value) => {
  if (err) throw err
  console.log(`Got: ${value}`)
})
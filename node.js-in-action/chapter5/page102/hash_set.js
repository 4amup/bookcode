const redis = require('redis')
let client = redis.createClient(6379, 'localhost')

client.on('error', err => {
  console.log(err)
})

// 设定哈希键值对，可以有层次结构，类似于json
client.hmset('camping', {
  'shelter': '2-person tent',
  'cooking': 'campstove'
}, redis.print)

// 根据键读取相应的值，依次填入键，读出相应的值
client.hget('camping', 'cooking', (err, value) => {
  if (err) throw err
  console.log(`Will be cooking with: ${value}`)
})

// 列出哈希表出所有的键
client.hkeys('camping', (err, keys) => {
  if (err) throw err
  keys.forEach((key, index) => {
    console.log(`第${index+1}个键：${key}`)
  })
})
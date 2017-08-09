const redis = require('redis')
let client = redis.createClient(6379, 'localhost')

client.on('error', err => {
  console.log(err)
})

client.sadd('ip_addresses', '204.10.7.152', redis.print) //Reply: 1
client.sadd('ip_addresses', '205.101.71.52', redis.print) // Reply: 1
client.sadd('ip_addresses', '201.120.3.112', redis.print) // Reply: 1
client.sadd('ip_addresses', '201.120.3.112', redis.print) // 同样的内容添加了两次，Reply: 0

// 打印所有集合内容
client.smembers('ip_addresses', (err, members) => {
  if (err) throw err
  members.forEach((value, index) => {
    console.log(`第${index+1}个集合元素是：${value}`)
  })
})
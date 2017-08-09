const redis = require('redis')
let client = redis.createClient(6379, 'localhost')

client.on('error', err => {
  console.log(err)
})

// 链表是有序的
client.lpush('tasks', 'Paint the bikeshed red.', redis.print)
client.lpush('tasks', 'Paint the bikesh green.', redis.print)
client.lrange('tasks', 0, -1, (err, items) => {
  if (err) throw err
  items.forEach((item, index) => {
    console.log(`第${index+1}个item是${item}`)
  })
})
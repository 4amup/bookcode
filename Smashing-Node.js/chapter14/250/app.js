const redis = require('redis')

// 创建客户端
let client = redis.createClient();

// 定义任务模型
  // 构造函数，创建对象
function User (id, data) {
  this.id = id
  this.data = data
}
  // 为User添加一个方法
  // callback为回调函数
User.prototype.save = function (callback) {
  if (!this.id) { // 如果没有这个id就随机给一个id
    this.id = String(Math.random()).substr(3)
  }
  // client.hmset(hash, obj[, callback])
  client.hmset(`user:${this.id}:data`, this.data, callback)
}
  // 关注
User.prototype.follow = function (user_id, callback) {
  client.multi()
  .sadd(`user:${user_id}:followers`, this.id)
  .sadd(`user:${this.id}:follow`, user_id)
  .exec(callback) // 所有的命令都必须等到exec执行后才能执行
}
  // 取关
User.prototype.unfollow = function (user_id, callback) {
  client.multi()
  .srem(`user:${user_id}:followers`, this.id)
  .srem(`user:${this.id}:follows`, user_id)
  .exec(callback) // 所有的命令都必须等到exec执行后才能执行
}
User.prototype.getFollowers = function (callback) {
  client.smembers(`user:${this.id}:followers`, callback)
}
User.prototype.getFollows = function (callback) {
  client.smembers(`user:${this.id}:follows`, callback)
}
// 计算交集，即互相关注的人，即朋友
User.prototype.getFriends = function (callback) {
  client.sinter(`user:${this.id}:follows`, `user:${this.id}:followers`, callback)
}
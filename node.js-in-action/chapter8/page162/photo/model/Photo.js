const mongoose = require('mongoose')

// 开始连接数据库连接
mongoose.connect('mongodb://localhost/photo_app')

// 监听连接和错误事件
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('数据库连接成功！')
});

let schema = new mongoose.Schema({
  name: String,
  path: String
})

module.exports = mongoose.model('Photo', schema)
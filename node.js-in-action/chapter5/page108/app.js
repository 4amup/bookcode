const mongoose = require('mongoose')
// 使用本地的Promise
mongoose.Promise = global.Promise

const db = mongoose.connect('mongodb://localhost/tasks', {useMongoClient: true})
// 注册schema，设定默认值、处理输入、加强校验
let Tasks = new mongoose.Schema({
  project: String,
  description: String
})

// 添加任务
let Task = mongoose.model('Task', Tasks)
// let task = new Task()
// task.project = 'Bikeshed'
// task.description = 'Paint the bikeshed red'
// task.save(err => {
//   if (err) throw err
//   console.log('Task saved.')
// })

// 搜索文档
Task.find({'project': 'Bikeshed'}, (err, tasks) => {
  tasks.forEach((task, index) => {
    console.log(`ID:${task._id}`, task.description)
  })
})

// 终止数据库的连接
mongoose.disconnect()
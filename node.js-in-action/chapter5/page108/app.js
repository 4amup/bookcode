const mongoose = require('mongoose')
// 使用本地的Promise
mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost/tasks', {useMongoClient: true})

// 注册schema，设定默认值、处理输入、加强校验
let Tasks = new mongoose.Schema({
  project: String,
  description: String
})

// 注册model
let Task = mongoose.model('Task', Tasks)

// 添加任务
// let task = new Task()
// task.project = 'Bikeshed'
// task.description = 'Paint the bikeshed red'
// task.save(err => {
//   if (err) throw err
//   console.log('Task saved.')
// })

// 搜索文档
// Task.find({'project': 'Bikeshed'}, (err, tasks) => {
//   tasks.forEach((task, index) => {
//     console.log(`ID:${task._id}`, task.description)
//   })
// })

// 更新文档
// Task.update(
//   {_id: '598d41772c4a67304873cbf6'}, //使用的是内部id更新
//   {description: 'Paint the bikeshed green.'},
//   {multi: false}, // 只更新一个文档
//   (err, raw) => {
//     if (err) throw err
//     console.log('The raw response from Mongo was ', raw)
//   }
// )

// 删除文档
Task.findById('598d41772c4a67304873cbf6', (err, task) => {
  task.remove()
})

// 终止数据库的连接
mongoose.disconnect()
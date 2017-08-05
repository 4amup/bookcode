const fs = require('fs'),
      path = require('path')

// 公共变量部分
let args = process.argv.splice(2)
let command = args.shift()
let taskDescription = args.join(' ')
let file = path.join(process.cwd(), './tasks')

switch (command) {
  case 'list': 
    listTasks(file)
    break
  case 'add':
    addTask(file, taskDescription)
    break
  default: 
    console.log('Usage: ' + process.argv[0] + ' list|add [taskDescription]')
}

// 文本中加载用JSON编码的数据
function loadOrInitializeTaskArray (file, callback) {
  let tasks = []
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) {
      callback([])
      return
    }
    data = data.toString()
    tasks = JSON.parse(data || '[]')
    callback(tasks)
  })
}

// 列出任务的函数
function listTasks(file) {
  loadOrInitializeTaskArray(file, tasks => {
    tasks.forEach(task => {
      console.log(task)
    })
  })
}

// 把任务保存在磁盘文件中
function addTask (file, taskDescription) {
  loadOrInitializeTaskArray(file, tasks => {
    tasks.push(taskDescription)
    storeTasks(file, tasks)
  })
}

// 辅助储存任务
function storeTasks(file, taskDescription) {
  fs.writeFile(file, JSON.stringify(taskDescription), 'utf-8', err => {
    if (err) throw err

    console.log('Saved.')
  })
}
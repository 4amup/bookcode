const express = require('express')
  , nunjucks = require('nunjucks')
  , Sequelize = require('sequelize')
  , bodyParser = require('body-parser')

// 创建express实例
let app = express()

// 初始化sequelize
const sequelize = new Sequelize('todo_example', 'root', '8307', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
// 定义项目和工程模型
const Project = sequelize.define('Project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  created: Sequelize.DATE
})
const Task = sequelize.define('Task', {
  title: Sequelize.STRING
})
Task.belongsTo(Project)
Project.hasMany(Task)
// belongsTo联合意味着每个Task都有一个指向它所属项目的字段。另外每个任务模型都会有一个名为getProject的方法来获取其所属的项目。
// 对于hasMany而言，调用find查询到项目后，它们都会有一个名为getTasks的方法来获取项目中的任务。
// 初次之外，sequelize还支持另一种关系：hasOne。

// 同步后会创建projects和tasks两张表
sequelize.sync()
// 创建数据


// 配置应用
nunjucks.configure('views', {
  autoescape: true,
  express: app
})
app.set('view engine', 'njk')

// 中间件
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({extended: false}))

// 首页路由
app.get('/', (req, res, next) => {
  Project.findAll()
  .then((projects) => {
    res.render('index', {projects: projects})
  })
})

// 删除项目路由
// 页面删除后，也得在数据库删除
app.delete('/project/:id', (req, res, next) => {
  Project.destroy({where: {id: Number(req.params.id)}})
  .then(() => {
    res.send(`delete`)
  })
  .catch((err) => {
    console.log(err)
  })
})

// 创建项目路由
app.post('/projects', (req, res, next) => {
  // 是一个promise对象
  Project.create(req.body)
  .then((obj) => {
    res.send(obj) //发送JSON数据
  })
})

// 展示指定项目中的任务
app.get('/project/:id/tasks', (req, res, next) => {
  Project.findOne({where: {id: Number(req.params.id)}})
  .then((project) => {
    project.getTasks()
    .then((tasks) => {
      res.render('tasks', {project: project, tasks: tasks})
    })
  })
})

// 为指定项目添加任务
app.post('/project/:id/tasks', (req, res, next) => {
  // res.body.ProjectId = req.params.id
  Task.create(req.body)
  .then((obj) => {
    res.send(obj) //发送JSON数据
  })
})

// 删除任务路由
app.delete('/task/:id', (req, res, next) => {
  Task.destroy({where: {id: Number(req.params.id)}})
  .then(() => {
    res.send(`delete`)
  })
  .catch((err) => {
    console.log(err)
  })
})

// 监听
app.listen(3000, () => {
  console.log('http://localhost:3000')
})
const events = require('events')
const util = require('util')
const fs = require('fs')

// 创建构造器
function Watcher (watchDir, processedDir) {
  this.watchDir = watchDir
  this.processedDir = processedDir;
}

// 继承事件发射器的行为
util.inherits(Watcher, events.EventEmitter)
// 不建议使用 util.inherits()
// 请使用 ES6 的 class 和 extends 关键词获得语言层面的继承支持
// Watcher.prototype = new events.EventEmitter()

let watchDir = './watch',
    processedDir = './done'

Watcher.prototype.watch = function () {
  let watcher = this
  fs.readdir(this.watchDir, (err, files) => {
    if (err) throw err
    for (let index in files) {
      watcher.emit('process', files[index])
    }
  })
}

Watcher.prototype.start = function () {
  let watcher = this
  fs.watchFile(watchDir, () => {
    watcher.watch()
  })
}

let watcher = new Watcher(watchDir, processedDir)
watcher.on('process', function process (file) {
  let watchFile = this.watchDir + '/' + file
  let processedFile = this.processedDir + '/' + file.toLowerCase()

  fs.rename(watchFile, processedFile, err => {
    if(err) throw err
  })
})

// 启动对目录的监控
watcher.start()
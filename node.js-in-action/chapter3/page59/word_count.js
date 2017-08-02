const fs = require('fs')

// 公共变量定义区域
let completeTasks = 0,
    tasks = [],
    wordCounts = {},
    filesDir = './text'

function checkIfComplete () {
  completeTasks++;
  if (completeTasks === tasks.length) {
    for (let index in wordCounts) {
      console.log(index + ': ' + wordCounts[index])
    }
  }
}

function countWordsInText (text) {
  let words = text.toString()
                  .toLowerCase()
                  .split(/\s+/)
                  .sort()
  // 遍历words
  words.forEach((word, index) => {
    if (word) {
      // 以下是一个三元运算符
      wordCounts[word] = (wordCounts[word]) ? wordCounts[word] + 1 : 1
    }
  })
}

fs.readdir(filesDir, (err, files) => {
  if (err) throw err
  for(let index in files) {
    // 返回一个名为task的函数
    let task = (function (file) {
      return function () {
        fs.readFile(file, (err, data) => {
          if (err) throw err
          countWordsInText(data)
          checkIfComplete()
        })
      }
    })(filesDir + '/' + files[index])
    tasks.push(task) // 将任务推入堆栈
  }
  // 执行所有任务
  for (let index in tasks) {
    tasks[index]()
  }
})
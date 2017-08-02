const fs = require('fs'),
      request = require('request'),
      htmlparser = require('htmlparser'),
      configFilename = './rss_feeds.txt'

// 先要检查存在这个rss文件不
function checkForRSSFile () {
  fs.readFile(configFilename, (err, data) => {
    if (err) {
      return next(new Error('Missing RSS file:' + configFilename))
    }
    next(null, configFilename)
  })
}

// 读取rss源
function readRSSFile (configFilename) {
  fs.readFile(configFilename, (err, data) => {
    if (err) return next(err)
    let feedList = data
                  .toString()
                  .split('\n') // 按照换行符分隔成数组
    // 随机数index
    let random = Math.floor(Math.random() * feedList.length)
    next(null, feedList[random])
    // console.log(feedList[random])
  })
}

// 下载这个rss源的文件
function downloadRSSFeed (feedUrl) {
  console.log('随机到的rss源url：' + feedUrl)    
  request(feedUrl, (err, response, body) => {
  if (err) return next(err)
  if (response.statusCode !== 200) {
    return next(new Error('非正常 response status code'))
  }
  next(null, body)
  })
}

// 解析rss
function parserRSSFeed (rss) {
  let handler = new htmlparser.RssHandler()
  let parser = new htmlparser.Parser(handler)
  parser.parseComplete(rss)
  // 如果有数据，就打印出第一个title和link
  if (!handler.dom.items.length) {
    return next(new Error('No RSS items found'))
  }

  let item = handler.dom.items.shift()
  console.log(item.title)
  console.log(item.link)
}

let tasks = [
  checkForRSSFile,
  readRSSFile,
  downloadRSSFeed,
  parserRSSFeed
]


// 执行器
function next (err, result) {
  if(err) throw err

  let currentTask = tasks.shift()

  if(currentTask) {
    currentTask(result)
  }
}

next()
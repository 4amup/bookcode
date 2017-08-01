function asyncFunction (callback) {
  setTimeout(callback, 200)
}

let color = 'blue'

asyncFunction(() => { // 匿名函数形成闭包，冻结了color变量
  console.log('The color is ' + color)
})

color = 'green'
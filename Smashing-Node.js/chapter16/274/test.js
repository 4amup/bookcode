// 引入模块
const assert = require('assert')

// 主程序部分
let now = Date.now()
console.log(now)
assert.ok(now % 2 == 0)
// assert.ok可以用来判断提供的值是否为真，哪怕真的不是true，我们还是要断言它是true。
const User = require('./model')

// 测试用户
// key是邮箱 data是一个对象
let testUsers = {
  'mark@fackbook.com': {name: 'Mark Zuckerberg'},
  'bill@microsoft': {name: 'Bill Gates'},
  'jeff@amazon': {name: 'Jeff Bezos'},
  'fred@fedex': {name: 'Fred Smith'}
}

// 创建测试用户的函数
function create (users, callback) {
  let total = Object.keys(users).length
  // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
  // 数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 // 两者的主要区别是 一个 for-in 循环还会枚举其原型链上的属性
  for (let key in users) {
    (function (email, data) {
      let user = new User(email, data)
      user.save(function (err) {
        if (err) throw err
        --total || callback()
      })
    })(key, users[key])
  }
}

// 用于水合用户的函数
function hydrate (users, callback) {
  let total = Object.keys(users).length
  for (let key in users) {
    (function (email) {
      User.find(email, function (err, user) {
        if (err) throw err
        users[email] = user
        --total || callback()
      })
    })(key)
    // 以上是一个IIFE，立即执行函数表达式
  }
}

// 创建测试用户
create(testUsers, function () {
  hydrate(testUsers, function () {
    testUsers['bill@microsoft.com'].follow('jeff@amazon.com', function (err) {
      if (err) throw err;
      console.log('+ bill followed jeff');

      testUsers['jeff@amazon.com'].getFollowers(function (err, users) {
        if (err) throw err;
        console.log("jeff's followers", users);

        testUsers['jeff@amazon.com'].getFriends(function (err, users) {
          if (err) throw err;
          console.log("jeff's friends", users);

          testUsers['jeff@amazon.com'].follow('bill@microsoft.com'
          , function (err) {
            if (err) throw err;

            console.log('+ jeffed follow bill');

            testUsers['jeff@amazon.com'].getFriends(function (err, users) {
              if (err) throw err;

              console.log("jeff's friends", users);
              process.exit(0);
            });
          });
        });
      });
    });
  });
});
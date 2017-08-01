const flow = require('nimble')

flow.series([
  function (callback) {
    setTimeout(function () {
      console.log('I am first.')
      callback();
    }, 1000)
  },
  function (callback) {
    setTimeout(function () {
      console.log('I am second.')
      callback();
    }, 500)
  },
  function (callback) {
    setTimeout(function () {
      console.log('I am last.')
      callback();
    }, 100)
  }
])
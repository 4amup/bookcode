setTimeout(function () {
  console.log('I am first.')
  setTimeout(function () {
    console.log('I am second.')
    setTimeout(function () {
      console.log('I am last.')
    }, 100)
  }, 500)
}, 1000)
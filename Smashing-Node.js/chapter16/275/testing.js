const request = require('superagent')
  , assert = require('assert')

// 测试
request.get('http://localhost:3000')
  .query({ q: 'hello'})
  .end((err, res) => {
    if (err) throw err
    assert.ok(200 === res.status)
    assert.ok(res.text.toLowerCase().indexOf('book'))
    assert.ok(res.text.indexOf('<li>'))
  })
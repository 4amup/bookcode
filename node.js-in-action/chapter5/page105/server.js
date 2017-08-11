const mongodb = require('mongodb')

let server = new mongodb.Server('127.0.0.1', '27017', {})

let client = new mongodb.Db('mydatabase', server, {w: 1})

client.open(err => {
  if (err) throw err
  client.collection('test_insert', (err, collection) => {
    if (err) throw err
    console.log('We are now able to perform queries.')
    // 查询代码放在这里
    collection.insert(
      {
        "title": "I like cake",
        "body": "It is quite good."
      },
      {safe: true},
      (err, documents) => {
        if (err) throw err
        console.log('Document id is: ' + documents[0]._id)
      }
    )
  })
})
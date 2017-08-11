const mongodb = require('mongodb')
let MongoClient = mongodb.MongoClient
let url = 'mongodb://localhost:27017/myproject'

MongoClient.connect(url, (err, db) => {
  console.log('Connected correctly to server...')

  db.close()
})
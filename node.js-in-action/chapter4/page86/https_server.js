const https = require('https'),
      fs = require('fs')

let options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./key-cert.pem')
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('Hello World\n')
})
.listen(3000, () => {console.log('run at https://localhost:3000')})
const connect = require('connect'),
      morgan = require('morgan');

let app = connect();

app.use(morgan(`type is :res[content-type], length is :res[content-length] and it took :response-time ms.`));

app.use((req, res) => {
  res.writeHead(200, {'Content-type': 'text/html'});
  res.end('Hello World!');
})

app.listen(3000);
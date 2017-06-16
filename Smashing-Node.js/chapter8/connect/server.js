const connect = require('connect');
const static = require('serve-static');

let app = connect();

app.use(static(__dirname + '/website'));

app.use((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Hello connect!</h1>');
});

app.listen(3000);

console.log('server run at http://localhost:3000');
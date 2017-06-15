const http = require('http');

http.createServer((req, res) => {
  if('/' === req.url) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`
    <form method='POST' action='/url'>
      <h1>My form</h1>
      <fieldset>
        <label>Personal information</label>
        <p>What is your name?</p>
        <input type='text' name='name'>
        <p><button>Submit</button></p>
      </fieldset>
    </form>
    `);
  } else if ('/url' === req.url) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`You sent a <b>${req.method}</b> request.`);
  }
}).listen(3000);

console.log('server run at http://localhost:3000');
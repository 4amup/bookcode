const connect = require('connect'),
      fs = require('fs'),
      formidable = require('formidable'),
      static = require('serve-static');

let app = connect();

app.use(static('static'));

// 查看req.body.file
app.use((req, res, next) => {
  if('POST' === req.method) {
    let form = new formidable.IncomingForm();
    form.on('file', (file) => {
      console.log(file);
    });
    form.on('end', () => {
      console.log('upload done');
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(`
      <h3>File: ${req.body.file.name}</h3>
      <h4>Type: ${req.body.file.type}</h4>
      <h4>Content-Type: ${data}</h4>
      `);
    });
    // form.parse(req, (err, fields, files) => {
    //   res.writeHead(200, {'Content-type': 'text/html'});
    //   res.end(`
    //   <h3>File: ${req.body.file.name}</h3>
    //   <h4>Type: ${req.body.file.type}</h4>
    //   <h4>Content-Type: ${data}</h4>
    //   `);
    // });
  } else {
    next();
  };
});

app.listen(3000);
console.log('run at http://localhost:3000');
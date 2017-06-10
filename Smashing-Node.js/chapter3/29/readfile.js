var fs = require('fs');

fs.readFile('readme.txt', 'utf-8', (err, data) => {
  if(err) return console.error(err);
  console.log(data);
});
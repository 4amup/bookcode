var fs = require('fs');
var stream = fs.createReadStream('./resource.json');
stream.on('data', (chunk) => {
  console.log(chunk);
})
stream.on('end', () => {
  console.log('finished');
})
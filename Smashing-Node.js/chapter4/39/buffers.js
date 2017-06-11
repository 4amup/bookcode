let mybuffer = new Buffer('==ii1j2i3h1i23h', 'base64');
console.log(mybuffer);
require('fs').writeFile('logo.gif', mybuffer, (err) => {
  if(err) {
    console.log(err);
  }
});
const https = require('https'),
      qs = require('querystring');

let search = process.argv[2];
console.log(search);

if(!search.length) {
  return console.log('\nUsage: node douban <search>\n');
}

console.log(`\nsearching for: ${search}...`);
let option = {
  host: 'api.douban.com',
  path: '/v2/book/search?' + qs.stringify({q: search})
};

let req = https.get(option, (res) => {
  let body = '';
  res.setEncoding('utf8');
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    let obj = JSON.parse(body);

    obj.books.forEach((book) => {
      console.log('--');
      console.log(book.title);
    });
  });
});

// req.end();
// 换用https.get后，无须再调用end方法了
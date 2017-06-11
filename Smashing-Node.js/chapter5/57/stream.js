const fs = require('fs');

// 下面的例子中，回调函数必须等到
// 整个文件读取完毕->载入到RAM->可用->触发
// fs.readFile('my-file.txt', 'utf8', (err, data) => {
//   console.log(data);
// });
let stream = fs.createReadStream('my-file.txt', {encoding: 'utf8'});

stream.on('data', (chunk) => {
  console.log(chunk);
});

stream.on('end', (chunk) => {
  console.log('文件读取完毕');
})
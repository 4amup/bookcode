const fs = require('fs');
// 获取工作目录下的所有文件
let files = fs.readdirSync(process.cwd());
files.forEach((file) => {
  // 监听css后缀的文件
  if(/\.css/.test(file)) {
    fs.watchFile(process.cwd() + '/' + file, () => {
      console.log(' - ' + file + ' changed!');
    });
  }
});
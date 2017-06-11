const fs = require('fs'),
      stdin = process.stdin,
      stdout = process.stdout;

fs.readdir(__dirname, (err, files) => {
  console.log('');

  if(!files.length) {
    return console.log('    \033[31m No files to show!\033[39m\n');
  }

  console.log('   Select which file or directory you want to see\n');
  // 串行执行的思想

  // called for each file walked in the dir
  let stats = {};
  function file(i) {
    let filename = files[i];

    fs.stat(__dirname + '/' + filename, (err, stat) => {
      stats[i] = stat;
      if(stat.isDirectory()) {
        console.log('    '+i+'    \033[36m'+filename+ '/\033[39m');
      } else {
        console.log('    '+i+'    \033[90m'+filename+ '/\033[39m')
      }
      // ++i返回的是加1之后的值，i++返回的是加1之前的值
      if(++i === files.length) {
        read();
        stdin.on('data', option);
      } else {
        file(i);
      }
    });
  }

  // called with the option supplied by the user
  function option(data) {
    let filename = files[Number(data)];
    if(!filename) {
      stdout.write('    \033[31mEnter your choice:\033[39m');
    } else {
      stdin.pause();

      if(stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, (err, files) => {
          console.log('');
          console.log('    (' + files.length + ' files)');
          files.forEach((file) => {
            console.log('    -  ' + file);
          });
          console.log('');
        });
        console.log('');
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8', (err, data) => {
          console.log('');
          console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m')
        });
      }
    }
  }

  // read user input when files are shown
  function read () {
    console.log('');
    stdout.write('    \033[33mEnter your choice:\033[39m');
    stdin.resume();
    stdin.setEncoding('utf8');
  }
  // start by walking the first file
  file(0);
});
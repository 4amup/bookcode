const connect = require('connect');
const static = require('serve-static');
const morgan = require('morgan');

let app = connect();

// 类似于以前的logger中间件一样
app.use(morgan('dev'));

// 静态文件托管
app.use('/', static(__dirname));

app.listen(3000);

console.log('server run at http://localhost:3000');
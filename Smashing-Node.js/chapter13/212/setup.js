const mysql = require('mysql')
  , config = require('./config')

// 初始化数据库连接
delete config.database;
let connection = mysql.createConnection(config);

// 开始连接 
connection.connect((err) => {
  if(err) throw err;
  console.log('connected as id ' + connection.threadId);
});

// 创建数据库
connection.query(`create database if not exists cart_example`, () => {
  console.log(`create the database!`);
});
connection.query(`use cart_example`);
// 如果存在就先删除，而后创建商品表
connection.query(`drop table if exists item`);
connection.query(`create table item(
  id INT(11) AUTO_INCREMENT,
  title VARCHAR(255),
  dexcription TEXT,
  created DATETIME,
  PRIMARY KEY (id))`);

connection.query('drop table if exists review');
connection.query(`create table review(
  id INT(11) AUTO_INCREMENT,
  item_id INT(11),
  text TEXT,
  stars INT(1),
  created DATETIME,
  PRIMARY KEY (id))`);

// 监听错误
connection.on('error', (err) => {
  throw err;
})

// 关闭数据库连接
connection.end(() => {
  process.exit();
});
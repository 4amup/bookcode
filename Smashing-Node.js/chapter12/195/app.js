// 引入依赖
const express = require('express'),
      mongodb = require('mongodb'),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks'),
      cookieParser = require('cookie-parser'),
      session = require('express-session');

// 实例化express
let app = express();


// 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: true}));
// 这是个自定义的中间件，关于session
app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    app.users.findOne({ _id: mongodb.ObjectID.createFromHexString(req.session.loggedIn) }, function (err, doc) {
      if (err) return next(err);
      res.locals.me = doc;
      next();
    });
  } else {
    res.locals.authenticated = false;
    next();
  }
});

// 模板引擎配置
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk'); //配置文件扩展名为njk

// 普通get路由
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/login', (req, res) => {
  res.render('login');
});
app.get('/signup', (req, res) => {
  res.render('signup');
});
app.get('/login/:signupEmail', (req, res) => {
  res.render('login', {signupEmail: req.params.signupEmail});
});
app.get('/logout', (req, res) => {
  req.session.loggedIn = null;
  res.redirect('/');
});

// 处理post路由
app.post('/signup', (req, res, next) => {
  app.users.insert(req.body.user, (err, doc) => {
    if(err) return next(err);
    res.redirect('/login/' + doc.ops[0].email);
  });
});

app.post('/login', (req, res) => {
  let data = {
    email: req.body.user.email,
    password: req.body.user.password
  }
  app.users.findOne(data, (err, doc) => {
    if(err) return next(err);
    if(!doc) {
      let tip = `<p>User not found.</p>
      <p>Go back and try again.</p>
      <a href="/login">Go back.</a>`
      return res.send(tip);
    }
    // 如果查到有这个了，就给req加一个状态session.loggedIn
    req.session.loggedIn = doc._id.toString();
    res.redirect('/');
  });
});

// 连接数据库
let MongoClient = mongodb.MongoClient;
let url = 'mongodb://localhost:27017/mongodb-test'; 
MongoClient.connect(url, function(err, db) {
  console.log("connected to mongodb");
  // 设定快捷方式来连接
  app.users = db.collection('users');
  // 使用ensureIndex
  db.ensureIndex('users', 'email', (err) => {
    if(err) throw err;
    db.ensureIndex('users', 'password', (err) => {
      console.log('ensured indexes');
      // 监听端口
      // 放在这里是因为，数据库没有连接成功的话，不允许在线打开
      app.listen(3000, () => {
        console.log('http://localhost:3000');
      });
    });
  });
});
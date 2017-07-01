// 引入依赖
const express = require('express'),
      mongoose = require('mongoose'),
      bodyParser = require('body-parser'),
      nunjucks = require('nunjucks'),
      cookieParser = require('cookie-parser'),
      session = require('express-session');

// 实例化express
let app = express();

// 连接数据库
mongoose.Promise = global.Promise; // 使用node.js自带的promise

let url = 'mongodb://localhost:27017/mongoose-test';

mongoose.connect(url, {useMongoClient: false}); // 这个false不知道是啥
let db = mongoose.connection;
db.on('err', (err) => {
  console.log('connection error!');
});
db.on('open', () => {
  console.log('server connected!');
});
// 定义模型
let UserSchema = {
  first: String,
  last: String,
  email: {type: String, unique: true},
  password: {type: String, index: true}
}
let User = mongoose.model('User', UserSchema);

// 中间件
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'my secret', resave: false, saveUninitialized: true}));
// 这是个自定义的中间件，关于session
app.use(function (req, res, next) {
  if (req.session.loggedIn) {
    res.locals.authenticated = true;
    User.findById(req.session.loggedIn, (err, doc) => {
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
  let user = new User(req.body.user);
  user.save((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/login/' + req.body.user.email);
    }
  });  
});

app.post('/login', (req, res) => {
  let user = {
    email: req.body.user.email,
    password: req.body.user.password
  }
  User.findOne(user, (err, doc) => {
    if(err) return next(err);
    if(!doc) {
      let tip = `<p>${doc.email} not found.</p>
                <p>Go back and try again.</p>
                <a href="/login">Go back.</a>`
      return res.send(tip);
    }
    // 如果查到有这个了，就给req加一个状态session.loggedIn
    req.session.loggedIn = doc._id.toString();
    res.redirect('/');
  });
});

// 监听端口
app.listen(3000, () => {
  console.log('http://localhost:3000');
});
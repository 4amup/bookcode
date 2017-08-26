// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
var express = require('express');
var formidable = require('formidable');
var router = express.Router();
var fs =require('fs');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
router.post('/', function(req, res) {
  //设置返回字符串编码
  res.header( 'Content-Type','text/javascript;charset=utf-8');
  //new一个formidable.IncomingForm();
  var form = new formidable.IncomingForm();
  //设置临时文件存放的路径
  form.uploadDir = "./routes";
  //设置上传数据的编码
  form.encoding='utf-8';
  //设置是否保持上传文件的拓展名
  form.keepExtensions = true;
  //文件上传过程中触发可以做上传进度查看
  form.on('progress', function(bytesReceived, bytesExpected) {
    if(bytesExpected>1024*1024*3){//bytesExpected为等待上传的文件的大小，超过大小就返回错手动触发error
      this.emit('error',"文件过大")
    };
  });
  //返回非文件的部分数据
  form.on('field', function(name, value) {
    console.log(name+" "+value)
  });
  //文件上传成功后触发
  form.on('file', function(name, file) {
    //成功上传，把临时文件移动到public文件夹下面
    fs.renameSync(file.path, "./public/photos/" + file.name);
  });
  //流程正常处理
  form.on('end',function(){
    res.end('上传成功');
  });
  //出错
  form.on('error',function(err){
    res.end(err);
  })
  //执行文件上传任务
  form.parse(req,function(){

  });

});

module.exports = router;

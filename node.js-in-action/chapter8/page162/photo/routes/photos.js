const express = require('express');
const router = express.Router();

// 模拟数据库实现
let photos = []
photos.push({
  name: 'Node.js Logo',
  path: 'http://nodejs.cn/static/images/logo.svg'
})
photos.push({
  name: 'test photo',
  path: 'https://mozilla.github.io/nunjucks/img/marketplace2x.png'
})

/* 列表路由 */
router.get('/', function(req, res, next) {
  res.render('photos', {
    title: 'Photos',
    photos: photos
  })
});

module.exports = router;
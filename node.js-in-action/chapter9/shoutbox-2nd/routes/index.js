const router = require('express').Router()
const Entry = require('../lib/entry')
let page = require('../lib/middleware/page')

// 加入分页中间件
router.use(page(Entry.count, 5))

/* GET home page. */
router.get('/', function(req, res, next) {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err)

    res.render('entries', { // 模板渲染
      title: 'Entries',
      entries: entries,
      locals: res.locals,
      page: res.locals.page
    })
  })
});

module.exports = router;

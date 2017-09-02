const router = require('express').Router()
const Entry = require('../lib/entry')
let page = require('../lib/middleware/page')

/* GET home page. */
router.get('/:page?', page(Entry.count, 5), function(req, res, next) { // page需要page这个参数
  console.log(req.params.page)
  let page = req.page
  Entry.getRange(page.from, page.to, (err, entries) => {
    if (err) return next(err)

    res.render('entries', { // 模板渲染
      title: 'Entries',
      entries: entries,
      locals: res.locals,
      page: req.page
    })
  })
});

module.exports = router;

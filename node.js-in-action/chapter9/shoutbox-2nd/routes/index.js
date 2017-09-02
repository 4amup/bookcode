const router = require('express').Router()
const Entry = require('../lib/entry')
let page = require('../lib/middleware/page')

router.use(page(Entry.count, 5))

/* GET home page. */
router.get('/', function(req, res, next) {
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

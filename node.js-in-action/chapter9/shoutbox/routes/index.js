const router = require('express').Router();
const Entry = require('../lib/entry')


/* GET home page. */
router.get('/', function(req, res, next) {
  Entry.getRange(0, -1, (err, entries) => {
    if (err) return next(err)
    
    res.render('entries', { // 模板渲染
      title: 'Entries',
      entries: entries,
      locals: res.locals
    })
  })
});

module.exports = router;

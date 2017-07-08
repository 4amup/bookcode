const request = require('superagent');

module.exports = function search (query, fn) {
  request.get('https://api.douban.com/v2/book/search?')
  .query({q: query})
  .end((err, res) => {
    if(err) {
      fn(new Error('Bad douban response!'));
    };
    if(res.body && Array.isArray(res.body.books)) {
      return fn(null, res.body.books);
    }
  });
};
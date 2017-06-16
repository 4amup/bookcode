let request = require('superagent');

request.get('https://api.douban.com/v2/book/search?').
        query({q: 'Node.js'}).
        end((err, res) => {
          if(err) console.log(err);
          let obj = res.body.books;
          obj.forEach((book) => {
            console.log(book.title);
          });
        });
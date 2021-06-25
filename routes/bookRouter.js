const express = require('express');

const bookRouter = express();

function routes(Book) {
  bookRouter.route('/books')
    .post((req, res) => {
      const book = new Book(req.body);

      // eslint-disable-next-line no-console
      console.log(book);
      book.save();
      return res.json(book);
    })
    .get((req, res) => {
      const query = {};
      if (req.query.genre) {
        query.genre = req.query.genre;
      }
      Book.find(query, (err, books) => {
        if (err) {
          return res.send(err);
        }
        return res.json(books);
      });
    });
  bookRouter.route('/books/:bookId')
    .get((req, res) => {
      Book.findById(req.params.bookId, (err, book) => {
        if (err) {
          return res.send(err);
        }
        return res.json(book);
      });
    });
}

module.exports = routes;

/* eslint-disable no-console */
// const http = require('http');
// const express = require('express');
//
// const bookRouter = express.Route();
// const server = http.createServer((req,res)=>{
//   res.end('Hello again');
//   console.log('Welcome I am trying again');
// });
// server.listen(2564,()=>{
//   console.log('server is running');
// });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// eslint-disable-next-line no-unused-vars
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express();
const app = express();
const port = process.env.PORT || 2005;
const Book = require('./models/bookModel');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);

    console.log(book);
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
app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API again');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

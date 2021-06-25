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

const app = express();
const port = process.env.PORT || 2005;
const Book = require('./models/bookModel');

const bookRouter = ('./routes/bookRouter')(Book);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API again');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

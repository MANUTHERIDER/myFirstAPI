/* eslint-disable linebreak-style */
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

const bookRouter = express();
const app = express();

const port = process.env.PORT || 2005;

bookRouter.route('/books')
  .get((req, res) => {
    const response = { hello: 'This is my API' };

    res.json(response);
  });

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API again');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${port}`);
});

const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'));

server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

const logger = (req, res, next) => {
  const { method, originalUrl} = req;
  console.log(`${method} to ${originalUrl}`)

  next();
}

module.exports = server;

const dotenv = require('dotenv');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Auth = require('./routes/api/auth');
const Posts = require('./routes/api/posts');
const Users = require('./routes/api/users');
const Profile = require('./routes/api/profile');


app.use('/api/users', Auth);
app.use('/api/profile', Profile);
app.use('/api/posts', Posts);
app.use('/api/users', Users);




process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
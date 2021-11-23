const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const morgan = require('./config/morgan');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(config.port, () => {
  console.log(`Server started on port: ${config.port}`);
});

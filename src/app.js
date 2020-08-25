const express = require('express');
const app = express();
const compress = require('compression');
const constants = require('./constants');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const dotenv = require('dotenv');
const index = require('./routes');
const error = require('./middlewares/error');
const process = require('process');
require('./models/index');
require('./helper/csvHelper')

dotenv.config();


const PORT = constants.PORT || 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());


// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());


app.listen(PORT, () => {
  console.log('APP LISTENING TO PORT', PORT)
});

app.get('/', (req, res, next) => next());

app.use('/', index);



// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);


process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  process.exit(1);
});


process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});


const createError  = require('http-errors');
const express      = require('express');
const path         = require('path');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');


//Import routes for "catalog" area of site
const indexRouter   = require('./routes/index');
const usersRouter   = require('./routes/users');
const catalogRouter = require('./routes/catalog'); 
const wiki           = require('./wiki.js')


const app = express();

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter); // Add catalog routes to middleware chain.
app.use('/wiki', wiki);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// //xpQ5xVgCGRdtOYCC
// // "mongodb://localhost:27017/local_library"


//Set up mongoose connection

const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/local_library';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// var mongoDB = process.env.MONGODB_URI || dev_db_url;


// // Set up default mongoose connection

// // Get the default connection


// // Bind connection to error event (to get notification of connection errors)








// // Import the mongoose module


// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');






// app.use('/catalog', catalogRouter); // Add catalog routes to middleware chain.





module.exports = app;

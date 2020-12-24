var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var { ApolloServer } = require('apollo-server-express');
var dotenv = require('dotenv');
var jwt = require('jsonwebtoken');
var cors = require('cors');

var isAuth = require('./middleware/is-auth');
var connectDB = require('./db');

var usersRouter = require('./routes/users');

var app = express();

dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', process.env.PORT || '5000');

app.use(cors({
  origin:true,
  credentials: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING
// app.use(isAuth);
app.use('/', usersRouter);

// const apolloServer = new ApolloServer({
//   schema: graphQlSchema,
//   rootValue: graphQlResolvers,
//   graphiql: true,
//   context: ({req, res}) => ({req, res})
// });

// apolloServer.applyMiddleware({ app, cors:false });

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

connectDB();

app.listen(app.get('port'), () => {
  console.log("App running on port " + app.get('port'))
});
const middlewareAuth = require('../middleware/auth');
const homepage = require('./homepage');
const auth = require('./auth');
const books = require('./books');
const authors = require('./authors');
const genres = require('./genres');
const series = require('./series');
const users = require('./users');
const administrators = require('./administrators');

module.exports = function (app) {
  app.use('/', homepage);
  app.use('/', auth);
  app.use('/books', books);
  app.use('/authors/', authors);
  app.use('/genres', genres);
  app.use('/series', series);
  // app.use('/users', [middlewareAuth, users]);
  app.use('/users', users);
  app.use('/administrators', administrators);
};

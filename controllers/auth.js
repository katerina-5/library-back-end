const authLib = require('../libs/auth');
const pool = require('./../config/postgresql').pool;

module.exports = {
  signIn,
  signUp,
  signInToManagerPanel
};

function signIn(req, res, next) {
  const login = req.body.login;

  pool.query('Select login, password from users where login = $1', [login], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.rowCount != 0) {
      let dbLogin = results.rows[0].login;
      let dbPassword = results.rows[0].password;

      if (dbPassword === req.body.password) {
        const token = authLib.createJWToken({
          group: 'user',
          ...req.body
        });

        res.send({
          auth: 'true',
          message: '',
          token: token
        });
      } else {
        res.send({ auth: 'false', message: 'Password does not right!', token: '' });
      }
    } else {
      res.send({ auth: 'false', message: 'Login is not in database!', token: '' });
    }
  });
}

function signUp(req, res, next) {
}

function signInToManagerPanel(req, res, next) {
}
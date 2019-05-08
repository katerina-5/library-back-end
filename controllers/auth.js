const authLib = require('../libs/auth');
const bcrypt = require('bcrypt');
const pool = require('./../config/postgresql').pool;

module.exports = {
  signIn,
  signUp,
  signInToManagerPanel
};

async function signIn(req, res, next) {
  console.log('User authorization');

  const login = req.body.login;

  try {
    const results = await pool.query('Select password from users where login = $1', [login]);
    console.log(results);

    // hash password
    // const hashPassword = await authLib.hashPassword(req.body.password, next);
    const password = req.body.password;

    if (results.rowCount != 0) {
      let dbPassword = results.rows[0].password;

      const check = await bcrypt.compare(password, dbPassword);
      console.log(check);

      if (check) {
        const token = authLib.createJWToken({
          group: 'user',
          login: login,
          password: dbPassword
          // ...req.body
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
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function signUp(req, res, next) {
  console.log('User registration');

  const { surname, name, login, password } = req.body;

  try {
    const results = await pool.query('Select login from users where login = $1', [login]);

    if (results.rowCount != 0) {
      // login is already in database
      res.send({ auth: 'false', message: 'Login is already in database!', token: '' });
    } else {
      // const hashPassword = await authLib.hashPassword(password, next);
      const hashPassword = await bcrypt.hash(password, 10);

      // create user
      const createUser = await pool.query('Insert into users(login, password, nickname, last_name, first_name) values($1, $2, $1, $3, $4)',
        [login, hashPassword, surname, name]);

      const token = authLib.createJWToken({
        group: 'user',
        login: login,
        password: hashPassword
        // ...req.body
      });

      res.send({
        auth: 'true',
        message: '',
        token: token
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function signInToManagerPanel(req, res, next) {
  console.log('Admin authorization');

  const login = req.body.login;

  try {
    const results = await pool.query('Select password from administrators where login = $1', [login]);
    console.log(results);

    const password = req.body.password;

    if (results.rowCount != 0) {
      let dbPassword = results.rows[0].password;

      const check = await bcrypt.compare(password, dbPassword);
      console.log(check);

      if (check) {
        const token = authLib.createJWToken({
          group: 'admin',
          login: login,
          password: dbPassword
          // ...req.body
        });

        res.send({
          auth: 'true',
          admin: 'true',
          message: '',
          token: token
        });
      } else {
        res.send({ auth: 'false', message: 'Password does not right!', token: '' });
      }
    } else {
      res.send({ auth: 'false', message: 'Login is not in database!', token: '' });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

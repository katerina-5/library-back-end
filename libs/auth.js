const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
const pool = require('./../config/postgresql').pool;

module.exports = {
    verifyJWTToken,
    createJWToken,
    hashPassword,
    getIdUserFromToken,
    checkToken
};

function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, 'test', (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err)
            }

            resolve(decodedToken)
        })
    })
}

function createJWToken(data = {}) {
    const token = jwt.sign({
        ...data
    }, 'test');

    return token
}

async function hashPassword(password, next) {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    } catch (error) {
        // Hashing failed error
        next(error);
    }
}

async function getIdUserFromToken(token, next) {
    let decoded = jwt_decode(token);
    console.log(decoded);

    try {
        const getIdUser = await pool.query('select id_user from users where login = $1', [decoded.login]);
        const id_user = getIdUser.rows[0].id_user;
        console.log(id_user);

        return id_user;
    } catch (error) {
        console.log(error);
        next(error);
    }

    return null;
}

function checkToken(token, response) {
    if (token === null) {
        response.status(401).json([]);
    }
}

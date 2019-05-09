const jwt_decode = require('jwt-decode');
const pool = require('./../config/postgresql').pool;

module.exports = {
    getIdUserFromToken
};

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

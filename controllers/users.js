const pool = require('./../config/postgresql').pool;
const handleTokenLib = require('../libs/auth');

module.exports = {
    user_list,
    user_detail,
    user_create,
    user_delete,
    user_update
};

// Display list of all users.
async function user_list(request, response, next) {
    console.log('List of users');

    try {
        const results = await pool.query('SELECT * FROM users ORDER BY id_user');
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Display detail page for a specific user.
async function user_detail(request, response, next) {
    console.log('User detail');

    const token = request.params.token;
    const id_user = await handleTokenLib.getIdUserFromToken(token, next);

    try {
        const results = await pool.query('SELECT * FROM users WHERE id_user = $1', [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// user create on POST.
async function user_create(request, response, next) {
    console.log('User create');

    try {
        const { login, password, nickname, last_name, first_name, phone, email } = request.body;

        const results = await pool.query('INSERT INTO users(login, password, nickname, last_name, first_name, phone, email) VALUES($1, $2, $3, $4, $5, $6, $7)',
            [login, password, nickname, last_name, first_name, phone, email]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Handle user update on POST.
async function user_update(request, response, next) {
    console.log('User update');

    const token = request.params.token;
    const id_user = await handleTokenLib.getIdUserFromToken(token, next);
    // const id_user = request.params.id;
    const { login, password, nickname, last_name, first_name, phone, email } = request.body;

    try {
        const results = await pool.query('UPDATE users SET login = $2, password = $3, nickname = $4, last_name = $5, first_name = $6, phone = $7, email = $8 WHERE id_user = $1',
            [id_user, login, password, nickname, last_name, first_name, phone, email]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// user delete on DELETE.
async function user_delete(request, response, next) {
    console.log('User delete');

    try {
        const id_user = request.params.id;

        const results = await pool.query('DELETE FROM users WHERE id_user = $1', [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

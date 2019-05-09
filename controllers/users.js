const pool = require('./../config/postgresql').pool;
const handleTokenLib = require('../libs/auth');

module.exports = {
    user_list,
    user_detail,
    user_create,
    user_delete,
    user_update,
    user_change_password
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

// Handle user update on PUT.
async function user_update(request, response, next) {
    console.log('User update');

    const token = request.params.token;
    const id_user = await handleTokenLib.getIdUserFromToken(token, next);
    // const id_user = request.params.id;
    // const { login, password, nickname, last_name, first_name, phone, email } = request.body;
    const { nickname, last_name, first_name, phone, email } = request.body;

    try {
        const results = await pool.query('UPDATE users SET nickname = $2, last_name = $3, first_name = $4, phone = $5, email = $6 WHERE id_user = $1',
            [id_user, nickname, last_name, first_name, phone, email]);
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

// Change password.
async function user_change_password(request, response, next) {
    console.log('User change password');

    const token = request.body.token;
    const id_user = await handleTokenLib.getIdUserFromToken(token, next);
    const { old_password, new_password } = request.body;

    try {
        const getPassword = await pool.query('select password from users where id_user = $1',
            [id_user]);
        let dbPassword = getPassword.rows[0].password;

        const check = await bcrypt.compare(old_password, dbPassword);

        if (check) {
            // update password
            const results = await pool.query('UPDATE users SET password = $2 WHERE id_user = $1',
                [id_user, new_password]);
            response.status(200).json(results.rows);
        } else {
            response.status(200).json({ message: 'old password isn\'t right!' });
        }
    } catch (error) {
        next(error);
    }
}

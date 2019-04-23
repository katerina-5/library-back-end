const pool = require('./../config/postgresql').pool;

module.exports = {
    administrator_list,
    administrator_detail,
    administrator_create,
    administrator_delete,
    administrator_update
};

// Display list of all administrators.
async function administrator_list(request, response, next) {
    console.log('List of administrators');

    try {
        const results = await pool.query('SELECT * FROM administrators ORDER BY id_user');
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Display detail page for a specific administrator.
async function administrator_detail(request, response, next) {
    console.log('Administrator detail');

    try {
        const id_user = request.params.id;

        const results = await pool.query('SELECT * FROM administrators WHERE id_user = $1', [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// administrator create on POST.
async function administrator_create(request, response, next) {
    console.log('Administrator create');

    try {
        const { id_user, login, password, nickname, last_name, first_name, phone, email } = request.body;

        const results = await pool.query('INSERT INTO administrators(id_user, login, password, nickname, last_name, first_name, phone, email) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
            [id_user, login, password, nickname, last_name, first_name, phone, email]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// Handle administrator update on POST.
async function administrator_update(request, response, next) {
    console.log('Administrator update');

    try {
        const id_user = request.params.id;
        const { login, password, nickname, last_name, first_name, phone, email } = request.body;

        const results = await pool.query('UPDATE administrators SET login = $2, password = $3, nickname = $4, last_name = $5, first_name = $6, phone = $7, email = $8 WHERE id_user = $1',
            [id_user, login, password, nickname, last_name, first_name, phone, email]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

// administrator delete on DELETE.
async function administrator_delete(request, response, next) {
    console.log('Administrator delete');

    try {
        const id_user = request.params.id;

        const results = await pool.query('DELETE FROM administrators WHERE id_user = $1', [id_user]);
        response.status(200).json(results.rows);
    } catch (error) {
        next(error);
    }
}

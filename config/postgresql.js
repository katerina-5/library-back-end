const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'olicunvr',
    host: 'isilo.db.elephantsql.com',
    database: 'olicunvr',
    password: '5BtiAChly-lAl2wyQqDMAGumj32HV0xm',
    port: 5432,
});

module.exports = {
    pool
}
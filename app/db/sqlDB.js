const mysql = require('mysql');
const config = require('../config/database.config.js');

const pool = mysql.createPool(config);

const query = async(sql, params) => new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
        if (err) {
            console.log('Error running sql: ' + sql)
            console.log(err)
            reject(err)
        } else {
            resolve(result)
        }
    })
})

module.exports = query;

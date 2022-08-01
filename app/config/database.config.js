module.exports = {
    host: '195.238.180.33',
    port: 33060,
    user: 'admin',
    password: 'Password',
    //database: 'tracker',
    database: 'trackertest',
    databaseT: 'trackertest',

    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
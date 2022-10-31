module.exports = {
    host: '192.168.0.2',
    port: 3306,
    user: 'admin',
    password: 'Password',
    //database: 'tracker',
    database: 'trackertest',
    databaseSequelize: 'trackertest',

    dialect: "mariadb",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

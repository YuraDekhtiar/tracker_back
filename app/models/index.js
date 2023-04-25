const {Sequelize, DataTypes} = require("sequelize");
const config = require("../config/database.config.js");
const db = {};

const sequelize = new Sequelize(config.databaseSequelize, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: console.log,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});

db.sequelize = sequelize;
db.Sequelize = DataTypes;
// Models
db.user = require("../models/user.model.js")(sequelize, DataTypes);
db.track = require("../models/track.model.js")(sequelize, DataTypes);
db.device = require("../models/device.model.js")(sequelize, DataTypes);
db.role = require("../models/role.model.js")(sequelize, DataTypes);
db.userRole = require("../models/user_role.model.js")(sequelize, DataTypes, db.user, db.role);
db.userAuthToken = require("../models/user_auth_token.model")(sequelize, DataTypes, db.user);
db.group = require("../models/group.model")(sequelize, DataTypes);
db.groupUser = require("./group_user.model")(sequelize, DataTypes, db.group, db.user);
db.groupDevice = require("./group_device.model")(sequelize, DataTypes, db.group, db.device);

module.exports = db;




/*
sequelize.sync().then(r => console.log(r));



(async function () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}());
*/

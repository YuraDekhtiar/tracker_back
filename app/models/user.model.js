const {DataTypes} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    return sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_visit: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        date_registration: {
            type: DataTypes.DATE,
            defaultValue: new Date()

        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['email'],
            },
            {
                unique: true,
                fields: ['username'],
            }
        ],
        timestamps: false
    });
}

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("device", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        device_login: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'no_name'
        },
        time_last_connection: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['device_login'],
            },
            {
                index: 'true',
                fields: ['id']
            },
        ],
        timestamps: false
    });
}
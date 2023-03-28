module.exports = (sequelize, DataTypes) => {
    return sequelize.define("device", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        login: {
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
            allowNull: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "null"
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['login'],
            },
            {
                index: 'true',
                fields: ['id']
            },
            {
                index: 'true',
                fields: ['refresh_token']

            }
        ],
        timestamps: false
    });
}

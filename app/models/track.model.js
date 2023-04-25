module.exports = (sequelize, DataTypes) => {
    return sequelize.define("track", {
        device_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            references: {
                model: 'devices',
                key: 'id',
            },
        },
        time: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
        },
        coords: {
            type: DataTypes.GEOMETRY('POINT'),
            allowNull: false,
        },
        speed: {
            type: DataTypes.FLOAT.UNSIGNED,
        },
        battery_level: {
            type: DataTypes.FLOAT.UNSIGNED,
        },
        temp: {
            type: DataTypes.FLOAT,
        },
        is_charging: {
            type: DataTypes.BOOLEAN
        }

    }, {
        timestamps: false,
        indexes: [
            {
                index: 'true',
                fields: ['device_id']
            },
            {
                index: 'true',
                fields: ['time']
            }
        ]
    });
}




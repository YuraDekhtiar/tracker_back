module.exports = (sequelize, DataTypes) => {
    return sequelize.define("groups", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING(255),
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0,
        }
    }, {
            timestamps: false,
            indexes: [
                {
                    unique: true,
                    fields: ['name'],
                }
            ]
        }
    )
}

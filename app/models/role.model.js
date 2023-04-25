module.exports = (sequelize, DataTypes) => {
    // Default value
    // Role.create({name: 'admin'}).then(r => r);
    // Role.create({name: 'user'}).then(r => r);

    return sequelize.define("role", {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: false,
        indexes: [
            {
                fields: ['name'],
            }
        ]
    });
}

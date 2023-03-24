module.exports = (sequelize, DataTypes, user, role) => {
    const User_role = sequelize.define('user_role', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    }, { timestamps: false });

    user.belongsToMany(role, {
        through: User_role,
        foreignKey: 'user_id',
        otherKey: 'role_id'


    });
    role.belongsToMany(user, {
        through: User_role,
        foreignKey: 'role_id',
        otherKey: 'user_id'
    });

    return User_role;
}

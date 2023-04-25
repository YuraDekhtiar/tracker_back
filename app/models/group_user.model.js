module.exports = (sequelize, DataTypes, group, user) => {
    const Group_user = sequelize.define('group_user', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    }, { timestamps: false });

    user.belongsToMany(group, {
        through: Group_user,
        foreignKey: 'user_id',
        otherKey: 'group_id'
    });

    group.belongsToMany(user, {
        through: Group_user,
        foreignKey: 'group_id',
        otherKey: 'user_id'
    });

    return Group_user;
}

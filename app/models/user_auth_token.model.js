module.exports = (sequelize, DataTypes, user) => {
    const User_auth_token = sequelize.define('user_auth_tokens', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        auth_token: {
            type: DataTypes.STRING(1024),
            allowNull: false
        }
    }, { timestamps: false });

    user.hasMany(User_auth_token, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKey: 'user_id',
        allowNull: false
    })

    return User_auth_token;
}

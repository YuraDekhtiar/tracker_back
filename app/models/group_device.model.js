module.exports = (sequelize, DataTypes, group, device) => {
    const Group_device = sequelize.define('group_device', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
    }, { timestamps: false });

    device.belongsToMany(group, {
        through: Group_device,
        foreignKey: 'device_id',
        otherKey: 'group_id'
    });

    group.belongsToMany(device, {
        through: Group_device,
        foreignKey: 'group_id',
        otherKey: 'device_id'
    });

    return Group_device;
}

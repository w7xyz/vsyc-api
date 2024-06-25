export default async function (sequelize, DataTypes) {
    const System = await sequelize.define("System", {
        idle: {
            defaultValue: true,
            type: DataTypes.BOOLEAN
        },
        idle_reason: DataTypes.STRING
    });

    return System
}
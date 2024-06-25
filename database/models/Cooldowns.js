export default async function (sequelize, DataTypes) {
    const Cooldowns = await sequelize.define("Cooldowns", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        daily: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        weekly: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        work: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        crime: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        reputation: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
    });

    return Cooldowns
}
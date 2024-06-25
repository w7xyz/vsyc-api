export default async function (sequelize, DataTypes) {
    let user = await sequelize.define("User", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        money: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        premium: {
            type: DataTypes.BIGINT,
            defaultValue: 0
        },
        tickets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        bets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        works: DataTypes.JSON,
        ban: DataTypes.BOOLEAN,
        ban_reason: DataTypes.STRING(2000),
        ban_date: DataTypes.BIGINT,
        ban_by: DataTypes.STRING,
        ban_by_tag: DataTypes.STRING,
    });

    return user
}
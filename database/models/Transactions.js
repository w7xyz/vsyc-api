export default async function (sequelize, DataTypes) {
    const Cooldowns = await sequelize.define("Transactions", {
        source: DataTypes.INTEGER,
        given_by: DataTypes.STRING,
        received_by: DataTypes.STRING,
        given_by_tag: DataTypes.STRING,
        received_by_tag: DataTypes.STRING,
        given_at: DataTypes.BIGINT,
        amount: DataTypes.BIGINT,
        users: DataTypes.JSON,
        message: DataTypes.STRING
    });

    return Cooldowns
}
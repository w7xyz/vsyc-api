export default async function (sequelize, DataTypes) {
    const Command = await sequelize.define("Commands", {
        author: DataTypes.STRING,
        date: DataTypes.BIGINT,
        content: DataTypes.STRING,
        name: DataTypes.STRING,
        aliases: DataTypes.JSON
    });

    return Command
}
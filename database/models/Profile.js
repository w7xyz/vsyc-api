export default async function (sequelize, DataTypes) {
    let profile = await sequelize.define("Profile", {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        reps: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        aboutme: {
            type: DataTypes.STRING,
            defaultValue: 'Essa é a descrição do meu perfil!'
        },
        wedding: DataTypes.BOOLEAN,
        wedding_date: DataTypes.BIGINT,
        wedding_user: DataTypes.STRING
    });

    return profile
}
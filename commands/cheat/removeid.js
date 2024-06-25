const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "removeid",
    description: "Exclusive Owner Command",
    aliases: ["removeid"],
    usage: "removeid [hwid]",
    cooldown: 5,

    async execute(message, args) {
        let user = message.author;
        let data;

        try {
            data = await schema.findOne({
                userId: user.id,
            });

            if (!data) {
                data = await schema.create({
                    userId: user.id,
                    guildId: message.guild.id,
                });
            }
        } catch (err) {
            console.log(err);
            return message.reply({
                content: "Ocorreu um erro ao executar este comando..."
            });
        }
        if (!message.member.roles.cache.has("1178473220786106470")) {
            return message.reply({
                content: "Você não tem permissão para executar este comando."
            });
        }
        const prefixo = 'n!removeid';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Verifica se o argumento foi fornecido
        if (!args[0]) {
            return message.reply({
                content: "Por favor, forneça o HWID a ser removido."
            });
        }

        // Verifica se o HWID atual é o mesmo fornecido como argumento
        if (data.hwid.toLowerCase() !== args[0].toLowerCase()) {
            return message.reply({
                content: "O HWID fornecido não corresponde ao HWID armazenado no banco de dados."
            });
        }

        // Remove o HWID do MongoDB
        data.hwid = null;

        try {
            await data.save();
            const embed = new EmbedBuilder()
                .setColor("#8A2BE2")
                .setDescription(
                    `O ID foi removido com êxito do meu banco de dados!`
                )
                .addFields([
                    {
                        name: "<:wifialt:1178708711900987503> ID Removido:",
                        value: `${args[0]}`,
                        inline: true
                    },
                    {
                        name: "<:retrato:1179462976202354820> Removido por:",
                        value: `${user} (${user.id})`,
                        inline: true
                    }
                ]);

            message.reply({ embeds: [embed] });
        } catch (err) {
            console.log(err);
            return message.reply({
                content: "Ocorreu um erro ao salvar as alterações no banco de dados."
            });
        }
    },
};

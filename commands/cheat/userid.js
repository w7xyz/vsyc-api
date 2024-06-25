const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "userid",
    description: "Verifica se um usuário possui ban ou HWID registrado",
    aliases: ["userid"],
    usage: "userid [userId]",
    cooldown: 5,

    async execute(message, args) {
        const prefixo = 'n!userid';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Verifica se foi fornecido o ID do usuário a ser verificado
        if (args.length < 1) {
            return message.reply({
                content: "Por favor, forneça o ID do usuário a ser verificado."
            });
        }

        const targetUserId = args[0];
        const targetData = await schema.findOne({
            userId: targetUserId,
        });

        if (!targetData) {
            return message.reply({
                content: "Usuário não encontrado na base de dados."
            });
        }

        const hwid = targetData.hwid !== null ? targetData.hwid : "N/A";
        const isBanned = targetData.ban && targetData.ban.hwid;
        const motivo = isBanned ? targetData.ban.motivo : "N/A";

        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(`Informações de Usuário`)
            .addFields([
                {
                    name: "<:retrato:1179462976202354820> Usuário:",
                    value: `<@${targetUserId}> (${targetUserId})`,
                    inline: false
                },
                {
                    name: "<:tachinha:1178712587295268975> Banido:",
                    value: isBanned ? "Sim" : "Não",
                    inline: true
                },
                {
                    name: "<:informacoes:1179462979104813087> Motivo:",
                    value: motivo,
                    inline: true
                },
                {
                    name: "<:wifialt:1178708711900987503> ID",
                    value: hwid,
                    inline: true
                }
            ]);

        message.reply({ embeds: [embed] });
    },
};

const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "banid",
    description: "Exclusive Owner Command",
    aliases: ["banid"],
    usage: "banid [userId] [motivo]",
    cooldown: 5,

    async execute(message, args) {
        let executor = message.author;

        // Verifica se o executor tem o cargo específico (ID 1178473220786106470)
        if (!message.member.roles.cache.has("1178473220786106470")) {
            return message.reply({
                content: "Você não tem permissão para executar este comando."
            });
        }

        const prefixo = 'n!banid';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Verifica se foram fornecidos argumentos corretos
        if (args.length < 2) {
            return message.reply({
                content: "Por favor, forneça o ID do usuário e o motivo para banir."
            });
        }

        const targetUserId = args[0];
        const motivo = args.slice(1).join(" ");

        // Procura o usuário na base de dados pelo ID do usuário
        const targetData = await schema.findOne({
            userId: targetUserId,
        });

        if (!targetData) {
            return message.reply({
                content: `Nenhum usuário encontrado com o ID: ${targetUserId}`
            });
        }

        // Atualiza os dados no MongoDB do usuário alvo
        const hwid = targetData.hwid || "N/A"; // Usar "N/A" se o HWID não estiver definido
        targetData.hwid = null; // ou ajuste conforme necessário
        targetData.ban = {
            hwid: hwid,
            motivo: motivo
        };

        await targetData.save();

        // Cria a embed com informações sobre o banimento
        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(
                `O usuário <@${targetUserId}> foi **banido** com êxito do meu banco de dados!`
            )
            .addFields([
                {
                    name: "<:wifialt:1178708711900987503> ID Banido:",
                    value: `${hwid}`,
                    inline: true
                },
                {
                    name: "<:retrato:1179462976202354820> Banido por:",
                    value: `${executor} (${executor.id})`,
                    inline: true
                },
                {
                    name: "<:informacoes:1179462979104813087> Motivo:",
                    value: `${motivo}`,
                    inline: true
                }
            ]);

        message.reply({ embeds: [embed] });
    },
};

const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const moment = require("moment");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "unbanid",
    description: "Exclusive Owner Command",
    aliases: ["unbanid"],
    usage: "unbanid [userId]",
    cooldown: 5,

    async execute(message, args) {
        let executor = message.author;

        // Verifica se o executor tem o cargo específico (ID 1178473220786106470)
        if (!message.member.roles.cache.has("1178473220786106470")) {
            return message.reply({
                content: "Você não tem permissão para executar este comando."
            });
        }

        const prefixo = 'n!unbanid';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Verifica se foram fornecidos argumentos corretos
        if (args.length < 1) {
            return message.reply({
                content: "Por favor, forneça o ID do usuário a ser desbanido."
            });
        }

        const targetUserId = args[0];

        // Procura o usuário na base de dados pelo ID do usuário
        const targetData = await schema.findOne({
            userId: targetUserId,
        });

        if (!targetData || !targetData.ban) {
            return message.reply({
                content: `Nenhum usuário encontrado com o ID: ${targetUserId} ou o usuário não está banido.`
            });
        }

        // Remove o banimento
        targetData.hwid = null;
        targetData.ban = null;

        await targetData.save();

        // Obtém a hora atual
        const hora = moment().format("DD/MM/YYYY HH:mm:ss");

        // Cria a embed com informações sobre o desbanimento
        const embed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(
                `O usuário <@${targetUserId}> foi **desbanido** com êxito do meu banco de dados!`
            )
            .addFields([
                {
                    name: "<:retrato:1179462976202354820> Desbanido por:",
                    value: `${executor} (${executor.id})`,
                    inline: true
                },
                {
                    name: "<:despertador:1179462980744777768> Horário:",
                    value: `${hora}`,
                    inline: true
                }
            ]);

        message.reply({ embeds: [embed] });
    },
};

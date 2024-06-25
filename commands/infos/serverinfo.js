const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "serverinfo",
    description: "Mostras as informações do server!",
    aliases: ["serverinfo"],
    usage: "serverinfo",
    cooldown: 5,

    async execute(message, args) {

        let membros = message.guild.memberCount;
        let user1 = message.author;
        let cargos = message.guild.roles.cache.size;
        let canais = message.guild.channels.cache.size;
        let entrou = message.guild.joinedTimestamp;
        let servidor = message.guild;
        let donoid = message.guild.ownerId;
        let emojis = message.guild.emojis.cache.size;
        let serverid = args[0].toLowerCase();
        let impulsos = message.guild.premiumSubscriptionCount;
        let data = message.guild.createdAt.toLocaleDateString("pt-br");

        let nasshh = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setThumbnail(message.guild.iconURL({ dinamyc: true, format: "png", size: 4096 }))
            .setTitle(`Informações do servidor ${message.guild}`)
            .addFields(
                {
                    name: `<:mundo:1178899166970265661> Identidade:`,
                    value: `\`\`\`${serverid}\`\`\``,
                    inline: true,
                },
                {
                    name: `<:informacoes:1179462979104813087> Canais em Geral:`,
                    value: `> Canais: ${canais}\n> Cargos: ${cargos}`,
                    inline: true,
                },
                {
                    name: `<:retrato:1179462976202354820> Usuarios:`,
                    value: `\`\`\`${membros} membros\`\`\``,
                    inline: true,
                },
                {
                    name: `<:despertador:1179462980744777768> Servidor criado:`,
                    value: `<t:${parseInt(message.guild.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: `<:foguete:1178711811726516255> ${user1.tag} Entrou em: `,
                    value: `<t:${parseInt(servidor.joinedTimestamp / 1000)}:F>`,
                    inline: true,
                },
                {
                    name: `<:coroa:1178707970872320191> Dono:`,
                    value: `<@!${donoid}> \`\`(${donoid})\`\``,
                    inline: true,
                }
        )
        
        
        
        
        message.reply({ embeds: [nasshh] })
	},
};

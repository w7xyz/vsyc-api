const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "sayembed",
    description: "Faz o bot falar em Embed!",
    aliases: ["sayembed"],
    usage: "sayembed [texto]",
    cooldown: 5,

    async execute(message, args) {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            message.reply(`<:circulocruzado:1178711298826051706> Você não possui permissão de Administrador.`);
         } else {
         const msgsay = args.slice(0).join(" ");
         message.delete()
         let botEmbed = new EmbedBuilder()
         .setColor("#8A2BE2")
         .setDescription(`${msgsay}`);
         message.channel.send({ embeds: [botEmbed] })
         }
	},
};

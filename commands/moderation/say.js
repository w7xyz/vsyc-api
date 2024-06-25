const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "say",
    description: "Faz o bot falar!",
    aliases: ["falar"],
    usage: "say [texto]",
    cooldown: 5,

    async execute(message, args) {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            message.reply(`<:circulocruzado:1178711298826051706> Você não possui permissão de Administrador.`);
         } else {
         const msgsay = args.slice(0).join(" ");
         message.delete()
         message.channel.send(`${msgsay}`)
         }
	},
};

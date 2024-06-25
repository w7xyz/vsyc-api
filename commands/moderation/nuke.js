const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "nuke",
    description: "Apague e crie um novo canal!",
    aliases: ["nuke"],
    usage: "nuke",
    cooldown: 5,

    execute(message, args) {
        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            message.reply({ content: `<:circulocruzado:1178711298826051706> Você não possui permissão para utilizar este comando!` });
            return;
        } 

        const channel = message.mentions.channels.first() || message.channel;

        const embedSuccess = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(`<:foguete:1178711811726516255> Canal nukado por: **${message.author.tag}**.`);

        channel.clone().then((chan) => {
            channel.delete();
            chan.send({ embeds: [embedSuccess] });
        });
	},
};

const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "sss",
    description: "Exclui de 1 a 100 mensagens no canal desejado!",
    aliases: ["clesar", "sss"],
    usage: "ss [numero de msg que deseja deletar]",
    cooldown: 5,

    execute(message, args) {
		message.channel.send({ content: "Pong." });
	},
};

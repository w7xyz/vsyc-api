const { EmbedBuilder, ChannelType } = require("discord.js");
const { prefix } = require("../config.js");

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message} message The Message Object of the command.
	 */

	async execute(message) {
		/**
                 * @type {EmbedBuilder}
                 * @description Help command embed object
                 */
		let mentionEmbed = new EmbedBuilder()
		.setColor("#2b2d31")
		.setDescription(
			"<:cranio:1181024797719797790> **Vsync Cheats™** \n Olá, meu nome é Vsync Cheats, se precisar de ajuda é só digitar: **/**"
		)
		return message.reply({ embeds: [mentionEmbed] })

	},
};

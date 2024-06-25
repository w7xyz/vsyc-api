const { EmbedBuilder, ChannelType } = require("discord.js");

// For now, the only available property is name array. Not making the name array will result in an error.

/**
 * @type {import('../../typings').TriggerCommand}
 */
module.exports = {
	name: ["nefer"],

	execute(message, args) {
		// Put all your trigger code over here. This code will be executed when any of the element in the "name" array is found in the message content.
		let mentionEmbed = new EmbedBuilder()
		.setColor("#8A2BE2")
		.setDescription(
			"<:coracao:1178707641447501854> **Nefer Bot™** \n Olá, meu nome é Nefer Bot, se precisar de ajuda é só digitar: **n!ajuda**"
		)
		message.reply({ embeds: [mentionEmbed] })
	},
};

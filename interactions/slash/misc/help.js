const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("ajuda")
		.setDescription(
			"Liste todos os meus comandos ou informações sobre um comando específico."
		),
		//.addStringOption((option) =>
		//	option
		//		.setName("comando")
		//		.setDescription("Comando especifico.")
		//),

	async execute(interaction) {
		/**
		 * @type {string}
		 * @description The "command" argument
		 */
		let name = interaction.options.getString("command");

		/**
		 * @type {EmbedBuilder}
		 * @description Help command's embed
		 */
		const helpEmbed = new EmbedBuilder()
		if (name) {
			name = name.toLowerCase();

			// If a single command has been asked for, send only this command's help.

			helpEmbed.setTitle(`Help for \`${name}\` command`);

			if (interaction.client.slashCommands.has(name)) {
				const command = interaction.client.slashCommands.get(name);

				if (command.data.description)
					helpEmbed.setDescription(
						command.data.description + "\n\n**Parameters:**"
					);
			} else {
				helpEmbed
					.setDescription(`No slash command with the name \`${name}\` found.`)
					.setColor("Red");
			}
		} else {
			// Give a list of all the commands

			helpEmbed
			.setColor("#2b2d31")
			.setDescription(
						"<:strategy:1244259158300037191> **Menu de Ajuda** \n Olá! Seja muito bem-vindo ao meu menu de comandos. Aqui, apresentarei todos os meus recursos e fornecerei orientações detalhadas sobre como utilizar cada um deles. \n"
					)

				
	
					.addFields([
						{
							name: "<:setting:1244259404128190504> Geral:",
							value: `> download [id], sethwid [hwid], user`
						}
					]);
		}

		// Replies to the interaction!

		await interaction.reply({
			embeds: [helpEmbed], ephemeral: true
		});
	},
};

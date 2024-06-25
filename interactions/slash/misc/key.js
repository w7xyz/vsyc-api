const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("key")
		.setDescription("Conceder acesso de download. (admin only)")
        .addStringOption((option) =>
			option
				.setName("chave")
				.setDescription("Acesso")
				.setRequired(true)
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
		let key = interaction.options.getString("chave");
        

		/**
		 * @type {EmbedBuilder}
		 * @description Help command's embed
		 */
        const member = interaction.member;
        if (!member.roles.cache.has("1234819847024541717")) {
            return interaction.reply({
                content: "<:multiply:1231681517978128456> Você não tem permissão para executar este comando!",
                ephemeral: true,
            });
            
        }
		const helpEmbed = new EmbedBuilder()
			helpEmbed
			.setColor("#2b2d31")
			.setDescription(
						"<:strela:1244110455887102065> **Download Liberado!** \n Obrigado por adquirir um de nossos produtos da Vsync Cheats! Abaixo, você encontrará todas as informações necessárias para baixar o nosso loader. Se precisar de suporte, por favor, solicite ajuda através de um ticket. \n"
					)

				
	
					.addFields([
						{
							name: "<:lock:1244256882382602352> Chave de Acesso:",
							value: `> ||${key}||`,
                            inline: true
                        },
                        {
                            name: "<:clouddownload:1244257778634330172> Comando:",
							value: `> /download ${key}`,
                            inline: true
                        }
						
					]);
		

		// Replies to the interaction!

		await interaction.reply({
			embeds: [helpEmbed], ephemeral: false
		});
	},
};

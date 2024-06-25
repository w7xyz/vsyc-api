const fs = require("fs");
const { EmbedBuilder, SlashCommandBuilder, MessageActionRow, MessageButton, WebhookClient } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("sethwid")
		.setDescription("Define o HWID de um usuário.")
		.addStringOption((option) =>
			option
				.setName("hwid")
				.setDescription("O HWID a ser definido.")
				.setRequired(true)
		),

	async execute(interaction) {
		const hwid = interaction.options.getString("hwid");
		const member = interaction.member;

		if (!member.roles.cache.has("1183913356940288090")) {
			return interaction.reply({
				content: "Você não tem permissão para executar este comando!",
				ephemeral: true,
			});
		}

		const userDataPath = "users.json";

		fs.readFile(userDataPath, "utf8", (err, data) => {
			if (err) {
				console.error("Erro ao ler o arquivo users.json:", err);
				return interaction.reply({
					content: "Ocorreu um erro ao definir o HWID.",
					ephemeral: true,
				});
			}

			let userData = [];
			try {
				userData = JSON.parse(data);
			} catch (error) {
				console.error("Erro ao analisar o arquivo users.json:", error);
				return interaction.reply({
					content: "Ocorreu um erro ao definir o HWID.",
					ephemeral: true,
				});
			}

			const userDataIndex = userData.findIndex(user => user.discordId === interaction.user.id);
			if (userDataIndex === -1) {
				return interaction.reply({
					content: "Usuário não encontrado em users.json.",
					ephemeral: true,
				});
			}

			userData[userDataIndex].hwid = hwid;

			fs.writeFile(userDataPath, JSON.stringify(userData, null, 2), (err) => {
				if (err) {
					console.error("Erro ao salvar as informações no arquivo users.json:", err);
					return interaction.reply({
						content: "Ocorreu um erro ao definir o HWID.",
						ephemeral: true,
					});
				}

            const user = interaction.user;
			const embed = new EmbedBuilder().setColor("#2b2d31")
            
            embed.setDescription("**HWID Definido com Sucesso!**")
            embed.addFields([
                {
                    name: "<:lock:1244256882382602352> HWID:",
                    value: `\`\`\`${hwid}\`\`\``,
                    inline: true
                },
                {
                    name: "<:user:1244257968577450055> Usuário:",
                    value: `> ${user.tag} (${user.id})`,
                    inline: false
                }
                
            ]);
             interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
            const webhookClient = new WebhookClient({ id: '1243996588154814576', token: 'qkgmDRe-RgjmihVvP82yXkMjrwqavP5XVqwxF-fbSq80-LIn7n_1s2Pa-1fsfdumeWCN' });

                    webhookClient.send({
                        embeds: [embed],
                    });
			});
            
		});
	},
};

const fs = require("fs");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("userinfo")
		.setDescription("Obtém informações sobre a licença de um usuário. (Admin Only)")
		.addStringOption((option) =>
			option
				.setName("discordid")
				.setDescription("O Discord ID do usuário para obter informações da licença.")
				.setRequired(true)
		),

	async execute(interaction) {
		const discordId = interaction.options.getString("discordid");
        const member = interaction.member;
        if (!member.roles.cache.has("1234819847024541717")) {
            return interaction.reply({
                content: "<:multiply:1231681517978128456> Você não tem permissão para executar este comando!",
                ephemeral: true,
            });
            
        }
		// Carrega as informações do arquivo users.json
		fs.readFile("users.json", "utf8", (err, data) => {
			if (err) {
				console.error("Erro ao ler o arquivo users.json:", err);
				return interaction.reply({
					content: "Ocorreu um erro ao ler as informações de licença. Por favor, tente novamente mais tarde.",
					ephemeral: true
				});
			}

			let userData;
			try {
				const usersData = JSON.parse(data);
				userData = usersData.find((user) => user.discordId === discordId);
			} catch (error) {
				console.error("Erro ao analisar o arquivo users.json:", error);
				return interaction.reply({
					content: "Ocorreu um erro ao analisar as informações de licença. Por favor, tente novamente mais tarde.",
					ephemeral: true
				});
			}

			if (!userData) {
				return interaction.reply({
					content: "Não foram encontradas informações de licença para o usuário especificado.",
					ephemeral: true
				});
			}

			const userMention = `<@${discordId}>`;

			const embed = new EmbedBuilder()
				.setTitle("Informações de Licença")
                .setColor("#2b2d31")
				//.setTimestamp()

				//.setDescription(`\`\`\`
///Product: ${userData.productName}
//License: ${userData.key}
//IP: ${userData.ip || "N/A"}
//HWID: ${userData.hwid || "N/A"}
//Expires: ${userData.validUntil ? new Date(userData.validUntil).toLocaleDateString() : "N/A"}
//\`\`\``)

				//.addField("User", userMention)
                embed.addFields([
                    {
                        name: "<:shoppingcart:1244260510501699626> Produto:",
                        value: userData.productName,
                        inline: true
                    },
                    {
                        name: "<:world:1244098390426390578> IP:",
                        value: `${userData.ip || "N/A"}`,
                        inline: true
                    },
                    {
                        name: "<:pulse:1244260508467728435> HWID:",
                        value: `${userData.hwid || "N/A"}`,
                        inline: true
                    },
                    {
                        name: "<:lock:1244256882382602352> Chave de Acesso:",
                        value: `\`\`\`${userData.key}\`\`\``,
                        inline: true
                    },
				]);

			interaction.reply({ embeds: [embed], ephemeral: true });
		});
	},
};

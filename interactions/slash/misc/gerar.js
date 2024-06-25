const fs = require("fs");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
	data: new SlashCommandBuilder()
		.setName("gerar")
		.setDescription("Gera uma chave aleatória e a envia via mensagem privada. (Admin Only)")
		.addStringOption((option) =>
			option
				.setName("discordid")
				.setDescription("O Discord ID da pessoa para enviar a chave.")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("name")
				.setDescription("O nome do produto associado à chave.")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("discordrole")
				.setDescription("Coloque o cargo (Cliente). Apenas esse!")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("user")
				.setDescription("O Usuario do cliente (Use o mesmo do Discord).")
				.setRequired(true)
		)
		.addStringOption((option) =>
			option
				.setName("time")
				.setDescription("O tempo de validade da chave (em dias). Exemplo: 30d.")
				.setRequired(true)
		),

	async execute(interaction) {
		const discordId = interaction.options.getString("discordid");
		const productName = interaction.options.getString("name");
		const username = interaction.options.getString("user");
		const timeInput = interaction.options.getString("time");
		const discordRole = interaction.options.getString("discordrole");

        const member = interaction.member;
        if (!member.roles.cache.has("1234819847024541717")) {
            return interaction.reply({
                content: "<:multiply:1231681517978128456> Você não tem permissão para executar este comando!",
                ephemeral: true,
            });
            
        }

		// Verifica se o formato do tempo é válido
		const timeRegex = /^(\d+)([dD])$/;
		if (!timeRegex.test(timeInput)) {
			return interaction.reply({
				content: "O formato de tempo fornecido é inválido. Por favor, forneça o tempo no formato `30d` (dias).",
				ephemeral: true
			});
		}

		const [, timeValue, timeUnit] = timeInput.match(timeRegex);
		const validityPeriod = parseInt(timeValue);

		// Gera a chave aleatória
		const generateKey = (length) => {
			let result = "VSYNC-";
			const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			const charactersLength = characters.length;
			for (let i = 0; i < length; i++) {
				result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		};
		const key = generateKey(24);

		const hwid = "";
		const ip = "0.0.0.0";
		try {
			const user = await interaction.client.users.fetch(discordId);
			const embed = new EmbedBuilder()
				//.setTitle("Sua Chave")
				.setDescription(`<:strela:1244110455887102065> **Login Liberado!** \n Obrigado por adquirir um de nossos produtos da Vsync Cheats! Abaixo, você encontrará todas as informações necessárias para baixar o nosso loader. Se precisar de suporte, por favor, solicite ajuda através de um ticket. \n`)
				.setColor("#2b2d31")
				//.setTimestamp()
                .addFields([
                    
                    {
                        name: "<:lock:1244256882382602352> Chave de Acesso:",
                        value: `\`\`\`${key}\`\`\``,
                        inline: true
                    }
                    
                ]);

			await user.send({ embeds: [embed] });
			await interaction.reply({
				content: `Chave enviada para ${user.tag} via mensagem privada.`,
				ephemeral: true
			});
		} catch (error) {
			console.error("Erro ao enviar mensagem privada:", error);
			return interaction.reply({
				content: "Não foi possível enviar a chave via mensagem privada. Verifique se o Discord ID é válido e se o usuário permite mensagens privadas.",
				ephemeral: true
			});
		}

		// Salva as informações no arquivo users.json
		const userInfo = {
			username,
			discordRole,
			discordId,
			productName,
			hwid,
			ip,
			key,
			validUntil: new Date(Date.now() + validityPeriod * 24 * 60 * 60 * 1000).toISOString() // Adiciona os dias à data atual
		};

		fs.readFile("users.json", "utf8", (err, data) => {
			if (err) {
				console.error("Erro ao ler o arquivo users.json:", err);
				return;
			}

			let existingData = [];
			try {
				existingData = JSON.parse(data);
			} catch (error) {
				console.error("Erro ao analisar o arquivo users.json:", error);
				return;
			}

			existingData.push(userInfo);

			fs.writeFile("users.json", JSON.stringify(existingData, null, 2), (err) => {
				if (err) {
					console.error("Erro ao salvar as informações no arquivo users.json:", err);
					return;
				}
				console.log("Informações salvas com sucesso!");
			});
		});
	},
};

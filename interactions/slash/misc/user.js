const fs = require("fs");
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Obtém informações sobre a sua licença"),

    async execute(interaction) {
        const discordId = interaction.user.id; // Pega o ID do usuário que executou o comando
        const member = interaction.member;

        if (!member.roles.cache.has("1183913356940288090")) {
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
                    ephemeral: true,
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
                    ephemeral: true,
                });
            }

            if (!userData) {
                return interaction.reply({
                    content: "Não foram encontradas informações de licença para o seu usuário.",
                    ephemeral: true,
                });
            }

            const embed = new EmbedBuilder()
                .setTitle("Informações de Licença")
                .setColor("#2b2d31")
                .addFields([
                    {
                        name: "<:shoppingcart:1244260510501699626> Produto:",
                        value: userData.productName,
                        inline: true,
                    },
                    {
                        name: "<:world:1244098390426390578> IP:",
                        value: `${userData.ip || "N/A"}`,
                        inline: true,
                    },
                    {
                        name: "<:pulse:1244260508467728435> HWID:",
                        value: `${userData.hwid || "N/A"}`,
                        inline: true,
                    },
                    {
                        name: "<:lock:1244256882382602352> Chave de Acesso:",
                        value: `\`\`\`${userData.key}\`\`\``,
                        inline: true,
                    },
                    {
                        name: "<:calendario:1244260517972017244> Validade até:",
                        value: `${userData.validUntil ? new Date(userData.validUntil).toLocaleDateString() : "N/A"}`,
                        inline: false,
                    },
                ]);

            interaction.reply({ embeds: [embed], ephemeral: true });
        });
    },
};

const fs = require("fs");
const { EmbedBuilder, SlashCommandBuilder, MessageActionRow, MessageButton, WebhookClient } = require("discord.js");

/**
 * @type {import('../../../typings').SlashInteractionCommand}
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Exclui uma licença com base na chave especificada.")
        .addStringOption((option) =>
            option
                .setName("license")
                .setDescription("A chave da licença a ser excluída.")
                .setRequired(true)
        ),

    async execute(interaction) {
        const licenseKey = interaction.options.getString("license");
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
                let usersData = JSON.parse(data);
                const index = usersData.findIndex((user) => user.key === licenseKey);
                if (index === -1) {
                    return interaction.reply({
                        content: "Não foi encontrada uma licença com a chave especificada.",
                        ephemeral: true
                    });
                }
                userData = usersData.splice(index, 1)[0];
                fs.writeFile("users.json", JSON.stringify(usersData, null, 2), (err) => {
                    if (err) {
                        console.error("Erro ao salvar as informações no arquivo users.json:", err);
                        return interaction.reply({
                            content: "Ocorreu um erro ao excluir a licença. Por favor, tente novamente mais tarde.",
                            ephemeral: true
                        });
                    }
                    console.log("Licença excluída com sucesso!");
                    const embed = new EmbedBuilder().setColor("#2b2d31")
            
            embed.setDescription("**Licença excluída com sucesso!** \n")
            embed.addFields([
                {
                    name: "<:lock:1244256882382602352> Licença:",
                    value: `\`\`\`${licenseKey}\`\`\``,
                    inline: true
                }
            ]);
            interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
                });
            } catch (error) {
                console.error("Erro ao analisar o arquivo users.json:", error);
                return interaction.reply({
                    content: "Ocorreu um erro ao analisar as informações de licença. Por favor, tente novamente mais tarde.",
                    ephemeral: true
                });
            }
        });
    },
};

const Discord = require("discord.js");
const { EmbedBuilder, MessageActionRow, MessageButton } = require("discord.js");
const schema = require("../../database/currencySchema");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "listid",
    description: "Lista todos os ID's registrados",
    aliases: ["listid"],
    usage: "listid",
    cooldown: 5,

    async execute(message, args) {
        // Verifica se o usuário tem as permissões adequadas (se necessário)
        // Adapte conforme a sua necessidade

        const prefixo = 'n!listid';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        try {
            const hwidList = await schema.find({}).select("hwid");
            
            if (hwidList.length === 0) {
                return message.reply({
                    content: "Não há HWIDs registrados no banco de dados."
                });
            }

            const embed = new EmbedBuilder()
                .setColor("#8A2BE2")
                .setDescription("Aqui estão todos os ID's registrados:")
                .addFields([
                    {
                        name: "<:wifialt:1178708711900987503> ID's:",
                        value: `- ` + hwidList.map(data => data.hwid || "N/A").join("\n" + "- "),
                        inline: true
                    }
                ]);

            message.reply({ embeds: [embed] });
        } catch (err) {
            console.error(err);
            message.reply({
                content: "Ocorreu um erro ao executar o comando."
            });
        }
    },
};

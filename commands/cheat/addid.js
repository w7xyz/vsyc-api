const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "addid",
    description: "Exclusive Owner Command",
    aliases: ["addid"],
    usage: "addid [hwid]",
    cooldown: 5,

    async execute(message, args) {
        let user = message.author;
        let data;

        try {
            data = await schema.findOne({
              userId: user.id,
            });
      
            if (!data) {
              data = await schema.create({
                userId: user.id,
                guildId: message.guild.id,
              });
            }
          } catch (err) {
            console.log(err);
            await message.reply({
              content: "Ocorreu um erro ao executar este comando..."
            });
          }

        

        const prefixo = 'n!addid';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Obtém todos os argumentos após o prefixo
        const argsDoComando = message.content.slice(prefixo.length).trim().split(/ +/);
        data.hwid = args[0].toLowerCase();
        await data.save();
		const embed = new EmbedBuilder()
          .setColor("#8A2BE2")
          .setDescription(
            `O ID foi incorporado com êxito ao meu banco de dados!`
          )
          .addFields([
            {
              name: "<:wifialt:1178708711900987503> ID:",
              value: `${argsDoComando}`,
              inline: true
            },
            {
              name: "<:retrato:1179462976202354820> Adicionado por:",
              value: `${user} (${user.id})`,
              inline: true
            }
          ]);
        
        message.reply({ embeds: [embed] });
	},
};

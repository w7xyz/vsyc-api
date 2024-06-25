const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha


const { EmbedBuilder } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "daily",
    description: "Reivindique sua recompensa diária",
    aliases: ["diario"],
    usage: "daily",
    cooldown: 3,

    async execute(message, args) {
        let amount = Math.floor(Math.random() * 10000) + 1000;
        let amount1 = Math.floor(Math.random() * 1) + 10;
        let user = message.mentions.users.first() || message.author;
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

    let timeout = 86400000;
    
    if (timeout - (Date.now() - data.dailyTimeout) > 0) {
        let timeLeft = ms(timeout - (Date.now() - data.dailyTimeout));
  
        await message.reply({
          content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** para usar este comando novamente.`,
        });
      } else {
        data.dailyTimeout = Date.now();
        data.wallet += amount * 1;
        data.diamonts += amount1 * 1;
        await data.save();

        const dailyEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(
          `<:brilhos:1178708709287940136> Você recebeu uma recompensa diária de **${amount.toLocaleString()} Coins** e **${amount1.toLocaleString()} Diamantes**`
        );

        message.reply({ embeds: [dailyEmbed] });
        }   
},
};

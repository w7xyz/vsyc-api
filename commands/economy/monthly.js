const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha


const { EmbedBuilder } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "monthly",
    description: "Reivindique sua recompensa mensal",
    aliases: ["mensal"],
    usage: "monthly",
    cooldown: 3,

    async execute(message, args) {

        let amount = Math.floor(Math.random() * 100000) + 10000;
        let amount1 = Math.floor(Math.random() * 1) + 50;
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
    
        let timeout = 2592000000;
    
        if (timeout - (Date.now() - data.monthlyTimeout) > 0) {
          let timeLeft = ms(timeout - (Date.now() - data.monthlyTimeout));
    
          await message.reply({
            content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** para usar este comando novamente.`,
          });
        } else {
          data.monthlyTimeout = Date.now();
          data.wallet += amount * 1;
          data.diamonts += amount1 * 1;
          await data.save();
    
          const monthlyEmbed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(
              `<:brilhos:1178708709287940136> Você recebeu uma recompensa mensal de **${amount.toLocaleString()} Coins** e **${amount1.toLocaleString()} Diamantes**`
            );
                
            await message.reply({
                embeds: [monthlyEmbed],
              });
            }

},
};
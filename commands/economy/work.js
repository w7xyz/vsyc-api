const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "work",
    description: "Trabalhe e ganhe algumas moedas!",
    aliases: ["job", "trabalhar"],
    usage: "work",
    cooldown: 5,

    async execute(message, args) {
        const professions = [
            {
              name: "Software Developer",
              value: "Software Developer",
            },
            {
              name: "Data Scientist",
              value: "Data Scientist",
            },
            {
              name: "Doctor",
              value: "doctor",
            },
            {
              name: "Waiter",
              value: "Waiter",
            },
            {
              name: "Painter",
              value: "Painter",
            }
          ];
        const randomProfession = professions[Math.floor(Math.random() * professions.length)];
        let user = message.author;
        let amount = Math.floor(Math.random() * 5000) + 500;
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
    
        let timeout = 3600000;

        if (timeout - (Date.now() - data.workTimeout) > 0) {
            let timeLeft = ms(timeout - (Date.now() - data.workTimeout));
      
            await message.reply({
              content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** para usar este comando novamente.`,
            });
          } else {
            data.workTimeout = Date.now();
            data.wallet += amount * 1;
            await data.save();
      
            const workEmbed = new EmbedBuilder()
              .setColor("#8A2BE2")
              .setDescription(
                `<:bolsadecompras:1178848801864302676> Você trabalhou como **${randomProfession.value}** e ganhou **${amount.toLocaleString()} Coins**!`
              );      

        await message.reply({
            embeds: [workEmbed],
          });
        }
    },
};
    
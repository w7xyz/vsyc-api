const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha


const { EmbedBuilder } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "withdraw",
    description: "Retire suas moedas do banco!",
    aliases: ["sacar"],
    usage: "withdraw [numero]",
    cooldown: 5,

    async execute(message, args) {
        let withdrawAmount = parseInt(args[0]);
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
        content: "Ocorreu um erro ao executar este comando...",
        ephemeral: true,
      });
    }

    if (withdrawAmount > data.bank) {
      await message.reply({
        content: "Você não tem tantas moedas em seu banco para sacar.",
      });
    } else if (withdrawAmount <= 0) {
      await message.reply({
        content: "Insira um número acima de 0.",
      });
    } else {
      data.bank -= withdrawAmount * 1;
      data.wallet += withdrawAmount * 1;
      await data.save();

      const withdrawEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(
          `<:circulousd:1178813608633831487> Retirado com sucesso **${withdrawAmount.toLocaleString()} Coin(s)** do Banco Nefer!`
        );

      await message.reply({
        embeds: [withdrawEmbed],
      });
    }
	},
};

const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "fish",
    description: "Pegue alguns peixes e ganhe moedas",
    aliases: ["pescar", "pesca"],
    usage: "fish",
    cooldown: 5,

    async execute(message, args) {
        let fishAmount = Math.floor(Math.random() * 20) + 1;
        let amount = fishAmount * 100 * 1;
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
        content: "Ocorreu um erro ao executar este comando...",
        ephemeral: true,
      });
    }

    let timeout = 30000;

    if (timeout - (Date.now() - data.fishTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.fishTimeout));

      await message.reply({
        content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** para usar este comando novamente.`,
      });
    } else {
      data.fishTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const fishEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(
          `<:fishbone:1178832563528273971> Você pegou **${fishAmount}** peixes e ganhou **${amount.toLocaleString()} Coins**!`
        );

      await message.reply({
        embeds: [fishEmbed],
      });
    }
	},
};

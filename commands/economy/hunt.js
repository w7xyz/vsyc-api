const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "hunt",
    description: "Cace alguns animais e ganhe moedas",
    aliases: ["cacar"],
    usage: "hunt",
    cooldown: 5,

    async execute(message, args) {
        const animals = [
            "Tiger",
      "Lion",
      "Rabbit",
      "Skunk",
      "Deer",
      "Elephant",
      "Hippo",
      "Bear",
      "Rhino",
          ];
        const animal = animals[Math.floor(Math.random() * animals.length)];
        let amount = Math.floor(Math.random() * 1000) + 500;
		let data;
        let user = message.author;
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

    let timeout = 3000000;

    if (timeout - (Date.now() - data.huntTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.huntTimeout));

      await message.reply({
        content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** to use este comando novamente.`,
      });
    } else {
      data.huntTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      const huntEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(
          `<:lion:1178852000520220773> Você caçou um **${animal}** e ganhou **${amount.toLocaleString()} Coins**!`
        );

      await message.reply({
        embeds: [huntEmbed],
      });
    }
	},
};

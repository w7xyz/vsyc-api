const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "addcoins",
	description: "Adiciona coins ao usuario!",
	args: true,
	ownerOnly: true,

	async execute(message, args) {

        let amount = parseInt(args[0]);
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

    
      data.wallet += amount * 1;
      await data.save();

      const addcoinsEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(
          `<:presente:1179097163435872407> Você adicionou **${amount.toLocaleString()} Coins** em **${user.username}** Wallet!`
        );

        await message.reply({
            embeds: [addcoinsEmbed],
          });
    },
};
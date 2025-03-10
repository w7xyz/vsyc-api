const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder } = require("discord.js");

module.exports = {
	name: "removecoins",
	description: "Remove coins de um usuario!",
	args: true,
	ownerOnly: true,
    ownerOnly2: true,

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

    
  if (amount > data.wallet) {
    await message.reply({
      content: "Este usuário não tem tantas moedas na carteira..."
    });
  } else {
    data.wallet -= amount * 1;
    await data.save();

      const removecoinsEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(
          `<:lixo:1179099359946747954> Você removeu **${amount.toLocaleString()} Coins** de **${user.username}** Wallet!`
        );
        
        await message.reply({
            embeds: [removecoinsEmbed],
          });
        }
    },
};

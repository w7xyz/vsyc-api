const Discord = require("discord.js");
const schema = require("../../database/currencySchema");
const ms = require("ms");  // Adicione esta linha


const { EmbedBuilder } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "deposit",
    description: "Deposita seus coins no Banco!",
    aliases: ["depositar"],
    usage: "deposit [numero]",
    cooldown: 5,

    async execute(message, args) {
        let depositAmount = parseInt(args[0]);
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
    
        if (depositAmount > data.wallet) {
          await message.reply({
            content: "Você não tem tantas moedas na carteira para depositar.",
          });
        } else if (depositAmount <= 0) {
          await message.reply({
            content: "Insira um número acima de 0.",
          });
        } else {
          data.wallet -= depositAmount * 1;
          data.bank += depositAmount * 1;
          await data.save();
    
          const depositEmbed = new EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(
              `<:banco:1178813611024584855> Depositado com sucesso **${depositAmount.toLocaleString()} Coin(s)** no Bank Nefer!`
            );
    
          await message.reply({
            embeds: [depositEmbed],
          });
        }
	},
};

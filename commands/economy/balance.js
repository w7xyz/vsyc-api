const Discord = require("discord.js");
const schema = require("../../database/currencySchema");

const { EmbedBuilder } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "balance",
    description: "Ver seu saldo ou o saldo de outro usuário!",
    aliases: ["saldo", "atm"],
    usage: "balance [user]",
    cooldown: 3,

    async execute(message, args) {

      let user = message.mentions.users.first() || message.author;

        if (!user) {
           user = message.mentions.users.first() || message.author;
         }

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
      await message.reply({
        content: "Ocorreu um erro ao executar este comando..."
      });
    }

        //const user = message.mentions.users.first() || message.author;
        // Certifique-se de obter o membro correto, dependendo do contexto.
        const member = message.guild.members.cache.get(user.id);

        const bot = user.bot;

        if (bot) {
          return message.reply({
            content: "Mencione um usuário!",
          });
        }

        const embed = new EmbedBuilder()
          .setColor("#8A2BE2")
          .setDescription(
            `Olá ${user}! Bem-vindo à Carteira Nefer, seu espaço personalizado para consultar seus diamantes, saldo bancário e o total na carteira. Explore suas finanças de maneira fácil e rápida! \n\n`
          )
          .addFields([
            {
              name: "<:circulousd:1178813608633831487> Carteira:",
              value: `${data.wallet.toLocaleString()}`,
              inline: true
            },
            {
              name: "<:banco:1178813611024584855> Banco:",
              value: `${data.bank.toLocaleString()}`,
              inline: true
            },
            {
              name: "<:diamante:1178813612366774455> Diamantes:",
              value: `${data.diamonts.toLocaleString()}`,
              inline: true
            },
          ]);
        
        message.reply({ embeds: [embed] });
    },
};

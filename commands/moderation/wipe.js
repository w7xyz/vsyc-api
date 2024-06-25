const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "wipe",
    description: "Exclui de 1 a 100 mensagens no canal desejado!",
    aliases: ["clear", "limpar"],
    usage: "wipe [numero de msg que deseja deletar]",
    cooldown: 5,

    async execute(message, args) {
        const numero = parseInt(args[0]);

        if (!message.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            return message.reply({ content: "<:circulocruzado:1178711298826051706> Você não tem permissão para utilizar este comando!" });
        }

        if (isNaN(numero) || numero > 100 || numero < 1) {
            const embed = new Discord.EmbedBuilder()
                .setColor("#8A2BE2")
                .setDescription('<:circulocruzado:1178711298826051706> Use números entre 1 e 100!');
            return message.reply({ embeds: [embed] });
        }

        await message.reply({ content: `Apagando **${numero}** mensagens...` });

        let totalDeleted = 0;
        let remaining = numero;

        while (remaining > 0) {
            const messagesToDelete = remaining > 100 ? 100 : remaining;
            const deleted = await message.channel.bulkDelete(messagesToDelete, true).catch((err) => {
                console.error(err);
                message.reply({ content: `<:circulocruzado:1178711298826051706> Houve um erro ao tentar apagar as mensagens!` });
                return null;
            });

            if (!deleted) break;
            totalDeleted += deleted.size;
            remaining -= deleted.size;

            if (deleted.size < messagesToDelete) break;
        }

        const embedSuccess = new Discord.EmbedBuilder()
            .setColor("#8A2BE2")
            .setDescription(`<:lixo:1179099359946747954> O canal ${message.channel} teve **${totalDeleted}** mensagens deletadas pelo(a) Staff: **${message.author.tag}**.`);

        await message.channel.send({ embeds: [embedSuccess] });
    },
};

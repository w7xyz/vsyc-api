const Discord = require("discord.js");
/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "delchannel",
    description: "Deleta o canal selecionado e se não selecionar deleta o canal da interação!",
    aliases: ["delchannel"],
    usage: "delchannel [canal]",
    cooldown: 5,

    execute(message, args) {
        const canalMencionado = message.mentions.channels.first() || message.channel;

        // Certifique-se de que message, member e permissions estão definidos
        if (message && message.member && message.member.permissions && message.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            canalMencionado.delete().then(async () => {
                message.channel.send({ content: `<:brilhos:1178708709287940136> O canal **${canalMencionado.name}** foi deletado por: **${message.author}**` });
            }).catch(error => {
                message.channel.send({ content: `<:circulocruzado:1178711298826051706> Ocorreu um erro ao deletar o canal!` });
                console.error(error);
            });
        } else {
            message.channel.send({ content: `<:circulocruzado:1178711298826051706> Você não tem permissão para usar este comando` });
        }
    },
};

const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "cafune",
    description: "Faça carinho em algum usuário!",
    aliases: ["cafune"],
    usage: "cafune [user]",
    cooldown: 5,
    args: true,


    async execute(message, args) {
        let user = message.mentions.users.first()
        let user1 = message.author;

        var lista1 = [
            'https://imgur.com/eFEgUMl.gif',
            'https://imgur.com/MMbBNhy.gif',
            'https://imgur.com/O5sDPN6.gif',
            'https://imgur.com/EhCdAue.gif',
            'https://imgur.com/qJzGLP5.gif'
        ];

        var lista2 = [
            'https://rrp-production.loritta.website/img/20be7326554c534e1898ac2543dced39dc036e17.gif',
            'https://rrp-production.loritta.website/img/72f21b39cacbb2702c461958d6e9fb599a11809a.gif',
            'https://rrp-production.loritta.website/img/e97de066504a44aa7d1563bbed9404b34f38c04c.gif',
            'https://rrp-production.loritta.website/img/51b6f4c8cf8d32b2ded7b4617cf2be00d25e3994.gif',
            'https://rrp-production.loritta.website/img/97a6bc6994b8d37ef255c592aa8003fe956a350b.gif'
        
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(`<:seguindo:1179201875099254874> **${user1.tag}** fez cafuné em **${user.tag}**!`)
        .setImage(`${random2}`)
        .setFooter({ text: `Pedido por: ${user1.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) });

		message.reply({ embeds: [embed] });
	},
};

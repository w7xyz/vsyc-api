const Discord = require("discord.js");
const axios = require('axios');

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "lyrics",
    description: "Fornece a letra de uma música!",
    aliases: ["letra"],
    usage: "lyrics [muisca] [autor]",
    cooldown: 5,
    args: true,

    async execute(message, args) {
            const song = parseInt(args[0]);
            const artist = parseInt(args[1]);
            let endpoint = `${song}`;

            const prefixo = 'n!lyrics';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Obtém todos os argumentos após o prefixo
        const argsDoComando = message.content.slice(prefixo.length).trim().split(/ +/);

            let user = message.author;
            const response = await axios.get(`https://lyrist.vercel.app/api/${argsDoComando}`);
            const data = response.data;
            if (!data || data.length === 0) {
                return message.reply("Não foi possível encontrar letras para essa música.");
            }
            const firstResult = Array.isArray(data) ? data[0] : data;
            const truncatedLyrics = firstResult.lyrics.slice(0, 4000);
            const lyricParts = truncatedLyrics.match(/[\s\S]{1,2000}/g) || [];
            
            
            for (let i = 0; i < lyricParts.length; i++) {
                const embed = new EmbedBuilder()
            .setColor('#8A2BE2')
            .setDescription(` <:estrelasdalua:1178710808465780766> Aqui estão as letras/lyrics da música desejada: \n
            > **${firstResult.title}** - **${firstResult.artist}**    

            ${lyricParts[i]}
            `)
            .setFooter({ text: `Pedido por: ${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) });
            

		await message.reply({ embeds: [embed] });
            } 
	},
};

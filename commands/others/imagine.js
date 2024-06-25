const Discord = require("discord.js");
const { Hercai } = require('hercai');
const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "imagine",
    description: "Descreva algo para a Nafer imaginar, e ela te entregará uma imagem!",
    aliases: ["imagine"],
    usage: "imagine [descricao da imagem]",
    cooldown: 5,

    async execute(message, args) {
        const client = new Hercai();
        const cooldowns = {};

        try {
            const canalId = message.channel.id;

            if (cooldowns[canalId] && cooldowns[canalId] > Date.now()) {
                const tempoRestante = (cooldowns[canalId] - Date.now()) / 1000;
                return message.reply(`Aguarde ${tempoRestante.toFixed(1)} segundos antes de usar este comando novamente.`);
            }

            const imagem = args.join(" ");
            const resposta = await client.drawImage({ model: "v2", prompt: imagem });

            cooldowns[canalId] = Date.now() + 7000;

            if (resposta.url) {
                const embed = new EmbedBuilder()
                    .setColor('#8A2BE2')
                    .setDescription(`<:brilhos:1178708709287940136> **Imagem Gerada com sucesso!** \n\n<:tachinha:1178712587295268975> Pedido por: **${message.author}**\n<:brilhos:1178708709287940136> Prompt: **${imagem}**`)
                    .setImage(resposta.url)

                message.reply({ embeds: [embed] });
            } else {
                console.error(resposta.error || '<:circulocruzado:1178711298826051706> Erro desconhecido na API!');
                message.reply('<:circulocruzado:1178711298826051706> Ocorreu um erro ao gerar a imagem. \n Por favor, contate meu [[Developer]](https://discord.gg/rFM8qRaGBU).');
            }
        } catch (error) {
            console.error(error);
            message.reply('<:circulocruzado:1178711298826051706> Ocorreu um erro ao processar sua solicitação.');
        }
    },
};

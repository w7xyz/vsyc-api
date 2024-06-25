const Kandaraku = require("kandaraku");
const kand = new Kandaraku();
const { EmbedBuilder, ChannelType } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    name: "gpt",
    description: "Comando para fazer perguntas igual no chat gpt pra IA responder!",
    aliases: ["gpt"],
    usage: "chatbot [pergunta]",
    cooldown: 5,

    async execute(message, args) {
        const prefixo = 'n!gpt';
        if (!message.content.startsWith(prefixo) || message.author.bot) {
            return; // Ignora mensagens que não começam com o prefixo ou são de outros bots
        }

        // Obtém todos os argumentos após o prefixo
        const argsDoComando = message.content.slice(prefixo.length).trim().split(/ +/);

        // Agora, 'argsDoComando' contém todas as palavras após "n!gpt" como um array
        //console.log('Comando:', prefixo);
        //console.log('Outros argumentos:', argsDoComando);

        // Transforma os argumentos em uma única string para o prompt
        const prompt = argsDoComando.join(' ');

        let response = await kand.conversationAnimeBotChat({
            message: `${prompt}`,
        });

        if (typeof response === 'object' && response.content) {
            response = response.content;
        }

        const maxLength = 3000;
        const partesDaResposta = [];
        let tempMessage = "";

        response.split(" ").forEach((word) => {
            if ((tempMessage + word).length < maxLength) {
                tempMessage += (tempMessage === "" ? "" : " ") + word;
            } else {
                partesDaResposta.push(tempMessage);
                tempMessage = word;
            }
        });

        if (tempMessage) {
            partesDaResposta.push(tempMessage);
        }

        for (let i = 0; i < partesDaResposta.length; i++) {
            const embed = new Discord.EmbedBuilder()
                .setDescription(`<:globo:1178707865444290721> Parte [${i + 1}/${partesDaResposta.length}] - ${message.author} \n${partesDaResposta[i]}`)
                .setColor("#8A2BE2");

            await message.reply({ embeds: [embed] });
        }
    },
};

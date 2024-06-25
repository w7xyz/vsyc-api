const Discord = require("discord.js");

const { EmbedBuilder, ChannelType } = require("discord.js");
const { version: discordjsVersion } = require('discord.js');

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
    name: "botinfo",
    description: "Mostra todas minhas informações!",
    aliases: ["bot"],
    usage: "botinfo",
    cooldown: 5,

   async execute(message, args, client) {
        try {
            const options = {
              method: 'GET',
              headers: {
                Authorization: '1142461380159610961-a09e210166efef9c777f0cee14472709ad0dbca0d9543816fca2b1e731776e45'
              }
            };
      
            const response = await fetch('https://api.squarecloud.app/v2/apps/a6d4465d78dd4b0199857d81fbb5dbe2/status', options);
            const data = await response.json();

    
        let user = message.author;
        let botEmbed = new EmbedBuilder()
        .setColor("#8A2BE2")
		.setDescription(`<:coracao:1178707641447501854> **Informações do BOT** \n\n Olá ${user}! Seja bem-vindo às minhas informações. Aqui, estou pronto para compartilhar todos os meus detalhes. Sinta-se à vontade para explorar e descobrir tudo o que posso oferecer!`)
        .addFields([
            {
                name: "<:brilhos:1178708709287940136> Informações:",
                value: `
                > Meu Nome: Nefer Bot™
                > Desenvolvido por: h4xixe. (1089991680649863328)
                > Prefixo: n!
                > Data da minha criação: <t:1700968200:D> (<t:1700968200:R>)
                `,
                inline: false
            },
            {
                name: "<:estatisticas:1178898902653616249> Minhas Estatísticas:",
                value: `
                > Protegendo \`${message.client.guilds.cache.size}\` Servidores!
                > Cuidando de \`10\` Usuários!
                > Disponível \`${message.client.commands.size}\` Comandos!
                > Usando \`${message.client.emojis.cache.size}\` Emojis!
                > Recodificando um total de \`4\` Shards!
                > Usando \`1024/1024Mib\` de Memoria
                > Usando \`512/512Mib\` de Memoria RAM
                > Usando \`0.0%\` da CPU
                `,
                inline: false
            },
            {
                name: "<:mundo:1178899166970265661> Outras Informações:",
                value: `
                > Node.js: **${process.version}**
                > Discord.js: **v${discordjsVersion}**
                > Hospedagem: [**Squarecloud**](https://squarecloud.app/)
                `,
                inline: false
            },
        ]);
		message.reply({ embeds: [botEmbed] });
    } catch (error) {
        console.error('Erro ao executar o comando api-status:', error);
        message.reply({ content: 'Erro ao executar o comando!' });
      }
	},
};

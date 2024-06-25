/**
 * @type {import('../../typings').LegacyCommand}
 */
const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Obtenha informações da API!",
    aliases: ["pong"],
    usage: "ping",
    cooldown: 5,

	

	async execute(message, client, interaction) {
		const options = {
			method: 'GET',
			headers: {
			  Authorization: '1142461380159610961-a09e210166efef9c777f0cee14472709ad0dbca0d9543816fca2b1e731776e45'
			}
		  };

		  function formatUptime(uptime) {
			const seconds = Math.floor(uptime / 1000);
			const minutes = Math.floor(seconds / 60);
			const hours = Math.floor(minutes / 60);
			const days = Math.floor(hours / 24);
		  
			const formattedUptime = `${days}d ${hours % 24}h ${minutes % 60}m ${seconds % 60}s`;
		  
			return formattedUptime;
		  }
	
		  const response = await fetch('https://api.squarecloud.app/v2/apps/a6d4465d78dd4b0199857d81fbb5dbe2/status', options);
		  const data = await response.json();

		const timeTaken = Date.now() - message.createdTimestamp;
			try {
				
		const embed = new EmbedBuilder()
		.setColor("#8A2BE2")
		.addFields([
			{
				name: "<:wifialt:1178708711900987503> Network:",
				value: `${data.response.network.total}` || 'Indisponível',
				inline: true
			},
			{
				name: "<:globo:1178707865444290721> Running:",
				value: data.response.running ? 'Sim' : 'Não',
				inline: true
			}
		]);
	
    	//.setDescription(`💜 Heartbeat: ${timeTaken} ms \n⏱️ API: data.status`)
		message.reply({ embeds: [embed] });
	//} else {
		//message.reply({ content: 'Dados inválidos recebidos da API.' });
	//}
		} catch (error) {
			console.error('Erro ao executar o comando ping:', error);
		}
	},
};

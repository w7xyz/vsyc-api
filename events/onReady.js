const { Client, REST } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');
const config = require("../config.js");
const mongoose = require('mongoose');


const rest = new REST({ version: '9' });

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
  

    const xxxx = chalk.hex('#2b2d31'); // Cor hexadecimal para roxo

    console.clear(); // Remova esta linha se não for necessário limpar o console

    console.log(xxxx(' [!] ') + `Pronto! Logado como: ` + (xxxx(`${client.user.tag}`)));

    const backupChannelId = "1243933652518174822"; 
try {
	const backupChannel = await client.channels.fetch(backupChannelId);
	const backupMessage = `Backup released at: ${new Date().toString()}`;

	backupChannel.send({ content: backupMessage, files: ["users.json"] });
	//console.log("Backup enviado com sucesso!");
  console.log(xxxx(' [!] ') + `Backup enviado com sucesso!`);
} catch (error) {
	//console.error("Erro ao enviar backup:", error);
  console.log(xxxx(' [!] ') + `Erro ao enviar backup: ` + xxxx(error));
}
    
  },
};


// "fs" declared is used in reloading command cache of the specified command.
const fs = require("fs");

/**
 * @type {import('../../typings').LegacyCommand}
 */
const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
	name: "reload",
	description: "Reloads a command",
	args: true,
	ownerOnly: true,

	execute(message, args) {
		/**
		 * @type {String}
		 * @description Name of the specifiied command in lowercase.
		 */

		const commandName = args[0].toLowerCase();

		const command =
			message.client.commands.get(commandName) ||
			message.client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		// Command returns if there is no such command with the specific command name or alias.
		if (!command) {
			return message.channel.send({
				content: `There is no command with name or alias \`${commandName}\`, ${message.author}!`,
			});
		}

		/**
		 * @type {String[]}
		 * @description Array of all command categories aka folders.
		 */

		const commandFolders = fs.readdirSync("./commands");

		/**
		 * @type {String}
		 * @description Name of the command category/folder of the specified command.
		 */

		const folderName = commandFolders.find((folder) =>
			fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`)
		);

		// Deletes current cache of that specified command.

		delete require.cache[
			require.resolve(`../${folderName}/${command.name}.js`)
		];

		// Tries Registering command again with new code.

		try {
			/**
			 * @type {import('../../typings').LegacyCommand}
			 * @description The new command (code fetch)
			 */

			const newCommand = require(`../${folderName}/${command.name}.js`);

			// Now registers the command in commands Collection. If it fails, the catch block will be executed.
			message.client.commands.set(newCommand.name, newCommand);

			// 🎉 Confirmation sent if reloading was successful!
			let helpEmbed = new EmbedBuilder()
				.setColor("#8A2BE2")
				.addFields([
					{
						name: "<:definicoes:1178708078196178985> Comando:",
						value: `\`${newCommand.name}\``,
                        inline: true
					},
					{
						name: "<:foguete:1178711811726516255> Recarregado por:",
						value: `\*${message.author.tag}\*`,
                        inline: true
					},
				]);
			message.reply({
				embeds: [helpEmbed],
			});
		} catch (error) {
			// Catch block executes if there is any error in your code. It logs the error in console and also sends back in discord GUI.

			console.error(error);
			message.channel.send({
				content: `There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``,
			});
		}
	},
};

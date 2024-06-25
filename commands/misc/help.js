// Deconstructing prefix from config file to use in help command
const { prefix } = require("./../../config.js");

// Deconstructing EmbedBuilder to create embeds within this command
const { EmbedBuilder, MessageActionRow, MessageButton } = require("discord.js");
const { InteractionType, ComponentType } = require("discord-api-types/v10");
const Discord = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
        name: "help",
        description: "Liste todos os meus comandos ou informações sobre um comando específico.",
        aliases: ["ajuda"],
        usage: "[nome do comando]",
        cooldown: 5,

	async execute(message, args) {
        if (!args.length) {
                let helpEmbed = new EmbedBuilder()

				.setColor("#8A2BE2")
				.setDescription(
                    "<:coracao:1178707641447501854> **Menu de Ajuda** \n Olá! Seja muito bem-vindo ao meu menu de comandos. Aqui, apresentarei todos os meus recursos e fornecerei orientações detalhadas sobre como utilizar cada um deles. \n"
				)

				.addFields([
					{
						name: "<:definicoes:1178708078196178985> Moderação:",
						value: `> ${prefix}wipe, ${prefix}ban, ${prefix}unban, ${prefix}kick, ${prefix}mute, ${prefix}unmute, ${prefix}lock, ${prefix}unlock, ${prefix}nuke, ${prefix}delchannel, ${prefix}say, ${prefix}sayembed`,
                        inline: true
					},
                    {
                        name: "<:brilhos:1178708709287940136> Diversão:",
						value: `> ${prefix}cafune`
                    },
                    {
                        name: "<:diamante:1178813612366774455> Economia:",
						value: `> ${prefix}balance, ${prefix}daily, ${prefix}deposit, ${prefix}fish, ${prefix}hunt, ${prefix}monthly, ${prefix}weekly, ${prefix}withdraw, ${prefix}work`
                    },
                    {
                        name: "<:brilhos:1178708709287940136> Informações:",
						value: `> ${prefix}botinfo, ${prefix}userinfo, ${prefix}vipinfo, ${prefix}serverinfo, ${prefix}ping`
                    },
                    {
                        name: "<:estrelasdalua:1178710808465780766> Outros:",
						value: `> ${prefix}imagine, ${prefix}gpt, ${prefix}lyrics`
                    },
                    {
                        name: "<:coroa:1178707970872320191> Owner:",
						value: `> ${prefix}reload, ${prefix}addcoins, ${prefix}removecoins, ${prefix}adddiamonds, ${prefix}rmvdiamonds`
                    }
				]);
                message.reply({ embeds: [helpEmbed] });
            }

                const { commands } = message.client;

                const name = args[0].toLowerCase();
                const command =
			    commands.get(name) ||
			    commands.find((c) => c.aliases && c.aliases.includes(name));

                if (!command) {
                    return message.reply({ content: "That's not a valid command!" });
                }

                let commandEmbed = new EmbedBuilder()
			    .setColor("#8A2BE2")

                if (command.description)
			        commandEmbed.setDescription(`**Descrição:** ${command.description}`);

                    if (command.aliases)
                    commandEmbed.addFields([
                        {
                            name: "Aliases:",
                            value: `> \`${command.aliases.join(", ")}\``,
                            inline: false,
                        },
                        {
                            name: "Cooldown:",
                            value: `> ${command.cooldown || 3} segundo(s)`,
                            inline: false,
                        },
                    ]);
                if (command.usage)
                    commandEmbed.addFields([
                        {
                            name: "Uso:",
                            value: `> \`${prefix}${command.name} ${command.usage}\``,
                            inline: false,
                        },
                    ]);

                message.reply({ embeds: [commandEmbed] });

	},
};

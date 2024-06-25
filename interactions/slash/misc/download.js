    const { EmbedBuilder, SlashCommandBuilder, MessageActionRow, MessageButton, WebhookClient } = require("discord.js");
    const Discord = require("discord.js");
    const schema = require("../../../database/currencySchema");

    module.exports = {
        data: new SlashCommandBuilder()
            .setName("download")
            .setDescription("Vsync System Download")
            .addStringOption((option) =>
                option
                    .setName("id")
                    .setDescription("Product ID")
                    .setRequired(true)
            ),

            
        async execute(interaction) {
            const id = interaction.options.getString("id");
            const user = interaction.user;
            const member = interaction.member;

        // Verifica se o usuário possui o cargo necessário
        if (!member.roles.cache.has("1183913356940288090")) {
            return interaction.reply({
                content: "<:multiply:1231681517978128456> Você não tem permissão para executar este comando!",
                ephemeral: true,
            });
            
        }
            const embed = new EmbedBuilder().setColor("#2b2d31")
            if (id === "vsync-91KCD") {
            embed.setDescription("**Here is the Woofer download!**")
            embed.addFields([
                {
                    name: "<:clouddownload:1244257778634330172> Download:",
                    value: `[Woofer Vsync](https://cdn.discordapp.com/attachments/1181743854660104203/1244033300016660510/Vsync_Woofer.exe?ex=6653a3cb&is=6652524b&hm=f9b6005da53047d84c5cdec037c516c533e1835b115a276e167e8eab98a1b7bb&)`,
                    inline: true
                },
                {
                    name: "<:user:1244257968577450055> Request:",
                    value: `${user.tag} (${user.id})`,
                    inline: true
                }
                
            ]);
        } 
        if (id === "vsync-EG7HV") {
            embed.setDescription("**Here is the Free Fire Menu download!**")
            embed.addFields([
                {
                    name: "<:clouddownload:1244257778634330172> Download:",
                    value: `[Free Fire](https://cdn.discordapp.com/attachments/1181743854660104203/1244027132494221353/vsyncc.exe?ex=66539e0d&is=66524c8d&hm=2fe2f7dab5179727071e22a72c46311540b22900bfc004e4305610f5b4913535&)`,
                    inline: true
                },
                {
                    name: "<:user:1244257968577450055> Request:",
                    value: `${user.tag} (${user.id})`,
                    inline: true
                }
                
            ]);
        } 
        if (id === "vsync-OPRF3") {
            embed.setDescription("**Here is the Fivem External download!**")
            embed.addFields([
                {
                    name: "<:clouddownload:1244257778634330172> Download:",
                    value: `[Fivem External](https://r2.e-z.host/4a60e094-fe51-4af7-9cdf-73215f20d87e/i608k6oi.exe)`,
                    inline: true
                },
                {
                    name: "<:user:1244257968577450055> Request:",
                    value: `${user.tag} (${user.id})`,
                    inline: true
                }
                
            ]);
        } 
        if (id === "vsync-OSX14") {
            embed.setDescription("**Here is the Fivem Woofer download!**")
            embed.addFields([
                {
                    name: "<:clouddownload:1244257778634330172> Download:",
                    value: `[Fivem Woofer](https://cdn.discordapp.com/attachments/1199102014399975545/1232125024278941777/Fivem_Woofer.exe?ex=663cc099&is=663b6f19&hm=59832077e303c4e022a175c8d8a93d9345420c9fb4d87210925f9765dddd76ac&)`,
                    inline: true
                },
                {
                    name: "<:user:1244257968577450055> Request:",
                    value: `${user.tag} (${user.id})`,
                    inline: true
                }
                
            ]);
        }
        
        

                    await interaction.reply({
                        embeds: [embed],
                        ephemeral: true,
                    });
        
                    const webhookClient = new WebhookClient({ id: '1181590234941628496', token: 'ne4YcYBu8I7t9OkEqhaOe5YvAEb7YUFwwsbymHDF7NCWpcL6S1voEfHKosTIqni8l5ND' });

                    webhookClient.send({
                        embeds: [embed],
                    });
            interaction.reply({
                content: "Ocorreu um erro ao executar o comando.",
                ephemeral: true,
            });
        }
        
    };

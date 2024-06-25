const Discord = require("discord.js");
const fetch = require("node-fetch");
const moment = require("moment");
moment.locale("pt-BR");

const { EmbedBuilder, ChannelType } = require("discord.js");

/**
 * @type {import('../../typings').LegacyCommand}
 */
module.exports = {
	name: "userinfo",
    description: "Obtenha informações de algum usuário!",
    aliases: ["userinfo"],
    usage: "[id or username]",
    cooldown: 5,
    args: true,

	async execute(message, args) {
    let user = message.mentions.users.first() || message.author;

    let user1 = message.author;
    const mentionedUser = message.mentions.users.first() || message.author;

        //if (!user) {
        //    return message.reply("Usuário não encontrado.");
        //}

        if (mentionedUser) {
          const mentionedUserId = mentionedUser.id;
          const mentionedUsername = mentionedUser.tag;
        }
        let data_conta = `<t:${~~(new Date(user.createdAt) / 1000)}:R>`;
        let servidor = `**<t:${~~(new Date(user.joinedAt) / 1000)}:R>**`;
        let AvatarPorBalah = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 })

        let boosts = message.guild.premiumSubscriptionCount;

        const data = await fetch(`https://nice-puce-scorpion-suit.cyclic.app/user/${mentionedUser.id}`, {}).then((res) => res.json());

        const flags = {
          staff: "<:discordstaff:1179117866386206831>",
          active_developer: "<:activedeveloper:1179118926047756398>",
          early_supporter: "<:earlysupporter:1179117798929211492>",
          verified_developer: "<:discordbotdev:1179118476036685855>",
          certified_moderator: "<:4149blurplecertifiedmoderator:1179110183352401920>",
          bug_hunter_level_1: "<:discordbughunter1:1179119361412317205>",
          bug_hunter_level_2: "<:discordbughunter2:1179119363752734720>",
          partner: "<:discordpartner:1179118474736435310>",
          legacy_username: "<:username:1179116725594230844>",
          hypesquad_house_1: "<:hypesquadbravery:1179117251262173214>",
          hypesquad_house_2: "<:hypesquadbrilliance:1179117335215341679>",
          hypesquad_house_3: "<:hypesquadbalance:1179117443940110376>",
          hypesquad: "<:hypesquadevents:1179118302535106590>",
          premium: "<:discordnitro:1179118927855493271>",
          guild_booster_lvl1: "<:discordboost1:1179120152932003870>",
          guild_booster_lvl2: "<:discordboost2:1179120149698195467>",
          guild_booster_lvl3: "<:discordboost3:1179120147961745408>",
          guild_booster_lvl4: "<:discordboost4:1179120145440981135>",
          guild_booster_lvl5: "<:discordboost5:1179120163900104845>",
          guild_booster_lvl6: "<:discordboost6:1179120161857470596>",
          guild_booster_lvl7: "<:discordboost7:1179120158925668537>",
          guild_booster_lvl8: "<:discordboost8:1179120157252124734>",
          guild_booster_lvl9: "<:discordboost9:1179120154462929059>",
        };
  
        const userflags = data.badges;
        let badges = userflags.map((flag) => flags[flag]).join(" ");
  
        if (badges === "") {
          badges = "Sem Insígnias";
        } else {
          badges = badges;
        }

        let embed = new EmbedBuilder()
        .setColor("#8A2BE2")
        .setDescription(`<:brilhos:1178708709287940136> Olá, ${user1}! Aqui estão algumas informações sobre este usuário:\n ﾠ`)
        .addFields([
          {
              name: "<:estatisticas:1178898902653616249> Principais Informações:",
              value: `
              > Usuário: ${user.tag}
              > Usuário ID: ${user.id}
              > Originalmente: ${data.user.legacy_username}
              > Nome Exibido: ${data.user.global_name}
              `,
              inline: false
          },
          {
            name: "<:tachinha:1178712587295268975> Outras Informações:",
            value: `
            > Insígnias: ${badges}
            > Total de Boost's: ${boosts} Boost's
            > Data da Conta: ${data_conta}
            > BOT: ${user.bot ? "é um BOT" : "Não é um BOT"}
            > Entrou no Servidor: ${servidor}
            > Avatar de [**${user.tag}**](${AvatarPorBalah})
            `,
            inline: false
        }
        ]);
        message.reply({ embeds: [embed] });

	},
};

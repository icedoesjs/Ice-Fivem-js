const { RichEmbed } = require('discord.js')
module.exports = {
        name: "steam",
        category: "misc",
        description: "Shows info for a steam profile",
        run: async (client, message, args, config) => {
        const fetch = require('node-fetch');
        await message.delete();
        const { stripIndents } = require('common-tags');
        const dateFormat = require('dateformat');
        const token = config.steamtoken

        if (!args[0]) return message.reply(`Invalid command usage | **IE: ${config.prefix1}steam IceyyM8**`)
        const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${token}&vanityurl=${args.join(" ")}`;

        fetch(url).then(res => res.json()).then(body => {
            if(body.response.success === 42) return message.reply(`Steam API returned a response code of 42 which = search failed `)

               const id = body.response.steamid
               const summaries = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${token}&steamids=${id}`;
               const bans = `http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key=${token}&steamids=${id}`;
               const state = ["Offline", "Online", "Busy", "Away", "Snooze", "Looking to trade!", "Looking to play!"]

        fetch(summaries).then(res => res.json()).then(body => {
           if (!body.repnse) return message.reply(`Error at body.response, profile not found`)
           const { personaname, avatarfull, realname, personastate, loccountrycode, profileurl, timecreated } = body.response.players[0] 

        fetch(bans).then(res => res.json()).then(body => {
            if(!body.players) return message.reply(`Error at body.players, profile not found!`)
            const { NumberOfVacBans, NumberOfGameBans } = body.players[0]

            const embed = new RichEmbed()
            .setColor(`${config.color}`)
            setAuthor(`${personaname}'s steam profile`, avatarfull)
            .setThumbnail(avatarfull)
            .setDescription(stripIndents`**Real Name:** ${realname} || "Not Known"}
            **Status:** ${state[personastate]}
            **Country:** :flag_${loccountrycode ? loccountrycode.toLowerCase() : "white"}
            **Account Created:** ${dateFormat(timecreated * 1000, "d/mm/yyyy (h:MM:ss TT)")}
            **Bans:** Vac: ${NumberOfVacBans}, Game: ${NumberOfGameBans}
            **Link:** [Profile Link](${profileurl})`)
            .setFooter(`Powered by the SteamAPI`)
            .setTimestamp();
            console.log(`Steam info fetched for profile id ${id}`)

            message.channel.send(embed)

        })
        })
        })}}
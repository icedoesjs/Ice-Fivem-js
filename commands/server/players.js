const { RichEmbed } = require('discord.js')
const { getServerInfo } = require('fivem-api')
module.exports = {
        name: "players",
        category: "server",
        description: "Check how many players are on our server",
        run: async (client, message, args, config) => {
        await message.delete();

        var online = await getServerInfo(`${config.ip}`)
        var max = online.infos.vars.sv_maxClients
        let embed = new RichEmbed()
            .setAuthor(`${config.shortname} Players Online`)
            .setThumbnail(`${config.logo}`)
            .setColor(`${config.color}`)
            .addField(`Online`, `${online.players.length}/${max}`, true)
            .setFooter(`IP: ${config.ip}`)
        message.channel.send(embed)
    }
}
const { RichEmbed } = require('discord.js')
const fivem = require("fivem-api")
module.exports = {
        name: "info",
        category: "server",
        description: "Shows info for your fivem server",
        run: async (client, message, args, config) => {
            await message.delete()
        
        const ip = config.ip

        var requester = await fivem.getServerInfo(ip)
        var online = requester.players.length
        var shallowed = requester.infos.vars.sv_scriptHookAllowed
        var hostname = requester.infos.vars.sv_hostname
        var vs = requester.infos.server
        var max = requester.infos.vars.sv_maxClients
        let embed = new RichEmbed
            .setAuthor(`${hostname}`)
            .setThumbnail(`${config.logo}`)
            .setColor(`#0071C1`)
            .addField(`Players Online`, `${online}/${max}`)
            .addField(`Script Hook allowed`, `${shallowed}`)
            .addField(`Resources`, `To many to count`)
            .setFooter(`FXVersion: ${vs}`)
        message.channel.send(embed)
    }
}

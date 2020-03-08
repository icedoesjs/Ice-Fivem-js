const { RichEmbed } = require('discord.js')
const dig = require('gamedig')
module.exports = {
    name: "players",
    category: "server",
    description: "See our online players!",
    run: async(client, message, args, config, language) => {
        await message.delete();
        return dig.query({
            type: 'fivem',
            host: config.ip,
            port: config.port,
            socketTimeout: 5000,
            udpTimeout: 10000
        }).then((info) => {
            const embed = new RichEmbed()
                .setAuthor(info.name)
                .setColor(config.color)
                .addField(`Online`, `${info.raw.clients}/${info.raw.sv_maxclients}`, true)
            message.channel.send(embed)
        }).catch((error) => {
            message.reply(`It seems the server is **offline!**`)
        })
    }
}

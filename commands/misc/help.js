const { RichEmbed } = require('discord.js')
module.exports = {
    name: `help`,
    aliases: ["h"],
    category: "misc",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async(client, message, args, config, language) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return menu(message, config, language)
        }
    }
}

function menu(message, config, language) {
    const embed = new RichEmbed()
    embed.setColor(config.color)
    embed.setThumbnail(config.logo)
    embed.setFooter(`${config.shortname} bot ${language.madeby} | github.com/iceyym8`)
    embed.setDescription(`${language.thanksforusing} ${config.shortname} bot, Prefix = ${config.prefix1}. ${language.viewmycmdsbelow} ${config.prefix1}help cmdname`)
    embed.addField(`${language.admincmds}`, " `ban` `kick` `purge` `announce` `rem-tick [id]`")
    embed.addField(`${language.misccmds}`, " `binfo` `help` `steam` `u-info` `create-tick [text]`")
    embed.addField(`${language.devcmds} (${config.devprefix})`, "`kill`, `restart`")
    embed.addField(`${language.servercmds}`, "`info` `players` `rules`")
    if (config.txadmin === "true") {
        embed.addField(`${language.txadmincmds}`, "`restartfx` `fxconfig` `query` `restartrsc` `kickid` `announcefx`")
    }
    message.channel.send(embed)

}


function getCMD(client, message, input, language) {
    const embed = new RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Information was not found for **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor(`${config.color}`).setDescription(info));
    }

    if (cmd.name) info = `**Command Name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
            info += `\n**Usage**: ${cmd.usage}`;
            embed.setFooter(`Syntax: <> = required, [] = optional`);
}

return message.channel.send(embed.setColor("RANDOM").setDescription(info))
}

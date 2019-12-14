const { RichEmbed } = require('discord.js')
const { stripIndents } = require('common-tags')
module.exports = {
    name: "help",
    aliases: ["h"],
    category: "misc",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args, config, language) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else  {
            return menu(client, message, config, language)
        }
    }
}

function menu(client, message, config, language){
    const embed = new RichEmbed()
    .setColor(`${config.color}`)
    .setThumbnail(`${config.logo}`)
    .setFooter(`${config.shortname} bot ${language.madeby} | github.com/iceyym8`)
    .setDescription(`${language.thanksforusing} ${config.shortname} bot, Prefix = ${config.prefix1}. ${language.viewmycmdsbelow} ${config.prefix1}help cmdname`)
    .addField(`${language.admincmds}`," `ban` `kick` `purge` `setlvl` `announce`")
    .addField(`${language.misccmds}`," `binfo` `help` `steam` `u-info`")
    .addField(`${language.profilecmds}`," `age` `commend` `gender` `hex` `rpname` `profile @user`")
    .addField(`${language.devcmds} (${config.devprefix})`, "`kill`, `restart`")
    .addField(`${language.servercmds}`, "`ip` `players` `rules`")
    .addField(`${language.txadmincmds}`, "`restartfx` `fxconfig` `query` `restartrsc` `kickid` `announcefx`")
    if (config.txadmin == "true") {
        return message.channel.send(embed)
    } else {
    const embed = new RichEmbed()
    .setColor(`${config.color}`)
    .setThumbnail(`${config.logo}`)
    .setFooter(`${config.shortname} bot ${language.madeby} | github.com/iceyym8`)
    .setDescription(`${language.thanksforusing} ${config.shortname} bot, Prefix = ${config.prefix1}. ${language.viewmycmdsbelow} ${config.prefix1}help cmdname`)
    .addField(`${language.admincmds}`, " `ban` `kick` `purge` `setlvl` `announce`")
    .addField(`${language.misccmds}`, " `binfo` `help` `steam` `u-info`")
    .addField(`${language.profilecmds}`, " `age` `commend` `gender` `hex` `rpname` `profile @user`")
    .addField(`${language.servercmds}`, "`ip` `players` `rules`")
    .addField(`${language.devcmds} (${config.devprefix})`, "`kill`, `restart`")
    message.channel.send(embed)
    }
    
}


function getCMD(client, message, input, language){
    const embed = new RichEmbed()

    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

    let info = `Information was not found for **${input.toLowerCase()}**`;

    if (!cmd) {
        return message.channel.send(embed.setColor("RANDOM").setDescription(info));
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


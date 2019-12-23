const { Discord, Client, Collection, RichEmbed } = require('discord.js');
const { readdirSync } = require('fs')
const client = new Client({
    disableEveryone: false,
    unknownCommandResponse: true
});
const config = require('./config/config.json')

if (config.language !== ("en" || "dan" || "swe" || "fr")) {
    console.error(`The language ${config.language} is not supported! Please use either en, dan, fr or swe!`)
}
require(`./local/${config.language}.json`)

if (config.language == "en") {
    let language = "en"
    console.log(`[${config.shortname}] Language set to english!`)
} else if (config.language == "dan") {
    let language = "dan"
    console.log(`[${config.shortname}] Sproget er indstillet til dansk`)
} else if (config.language == "swe") {
    let language = "swe"
    console.log(`[${config.shortname}] Språk inställt till svenska`)
} else if (config.langauge == "fr") {
    let language = "fr"
    console.log(`[${config.shortname}] Langue définie en français`)
}
let language = require(`./local/${config.language}`)

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

client.categories = readdirSync("./commands/")


client.on("ready", async () => {
    console.log(`\u001b[31m`, `------------[ ${config.shortname} | ${language.madeby} ]------------`)
    console.log(`\u001b[32 m`, `[${config.shortname}] ${language.firstlog} | ${client.users.size} users, ${client.channels.size} channels`)
    console.log(`\u001b[32 m`, `[${config.shortname}] ${language.secondlog} | https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
    console.log(`\u001b[32 m`, `[${config.shortname}] ${language.thirdlog}`)
    console.log(`\u001b[31m`, `------------[ ${config.shortname} | ${language.madeby} ]------------`)
    client.user.setActivity(`${config.activity}`, {
        type: "LISTENING"
    })
});

client.on('guildMemberRemove', member => {
    const channeltosend = member.guild.channels.find(channel => channel.name === `${config.joinchannel}`);
    var tagl = member.user.tag
    var leaveEmbed = new RichEmbed()
        .setColor(`RED`)
        .setDescription(`**${tagl}** ${langauge.justleft}`)
    channeltosend.send(leaveEmbed)
})

client.on('guildMemberRemove', member => {
    const channeltosend = member.guild.channels.find(channel => channel.name === `${config.joinchannel}`);
    var tagl = member.user.tag
    var leaveEmbed = new RichEmbed()
        .setColor(`RED`)
        .setDescription(`**${tagl}** ${langauge.justleft}`)
    channeltosend.send(leaveEmbed)
})

client.on('message', message => {
    var args = message.content.split(" ");
    var command = args[0].toLowerCase();
    if (command === `${config.devprefix}restart`) {
        if (!message.member.hasPermission(`${config.mainpermission}`)) return message.reply(`${language.noperms}`);
        message.channel.send(`${langauge.restarting}`)
        message.delete();
        console.clear();
        client.destroy()
        client.login(config.token);
        message.channel.send(`${config.shortname} ${langauge.restarted}`);
        return;
    }
});

client.on('message', message => {
    var args = message.content.split(" ");
    var command = args[0].toLowerCase();
    if (command === `${config.devprefix}kill`) {
        if (!message.member.hasPermission(`${config.mainpermission}`)) return message.reply(`${language.noperms}`);
        message.channel.send(`${language.killing} ${config.shortname}`)
        message.delete();
        console.clear();
        client.destroy()
        return;
    }
});

client.on('message', message => {
    var args = message.content.split(" ");
    var command = args[0].toLowerCase();
    var activity = args.slice(1).join(' ')
    if (command === `${config.devprefix}activity`) {
        message.delete()
        if (!message.member.hasPermission(`${config.mainpermission}`)) return message.reply(`${langauge.noperms}`);
        client.user.setActivity(`${activity}`)
        message.reply(`${langauge.activityupdate} ${activity}`)
    }
});


client.on('message', async (message) => {
    var leveling = require('discord-leveling')
    var profile = await leveling.Fetch(message.author.id)
    const channeltosend = message.guild.channels.find(channel => channel.name === `${config.botchatter}`);
    var prefix = `${config.prefix1}`
    var prefix3 = `${config.devprefix}`
    if (!message.content.startsWith(prefix || prefix3)) return;
    leveling.AddXp(message.author.id, 10)
    if (profile.xp + 10 > 200) {
        await leveling.AddLevel(message.author.id, 1)
        await leveling.SetXp(message.author.id, 0)
        const levelembed = new RichEmbed()
            .setAuthor(`${message.author.username} just leveled up!`)
            .setThumbnail(`${config.logo}`)
            .setColor(`${config.color}`)
            .addField(`Previous Level`, `${profile.level}`)
            .addField(`New Level`, `${profile.level + 1}`)
            .addField(`Points until next level`, `200 Points`)
            .setFooter(`Levels based of frequent messages`)
        channeltosend.send(levelembed)
        console.log(`[${config.shortname}] ${message.author.username} just leveled up to ${profile.level + 1}`)
    }
})

client.on('messageDelete', message => {
    const loggingchannelmsg = message.guild.channels.find(channel => channel.name === `${config.logchannel}`);
    var messagedel = message.cleanContent || "Message could not be retrieved!"
    if (message.cleanContent.startsWith(`${config.prefix1}` || `${config.devprefix}`)) return console.log(`${language.cmdran} ${message.channel.name}`)
    let delmsgembed = new RichEmbed()
        .setAuthor(`${config.shortname} ${language.logs}`)
        .setColor(`${config.color}`)
        .setThumbnail(`${config.logo}`)
        .setDescription(`${language.msgdeleted}`)
        .addField(`Channel`, `<#${message.channel.id}>`, true)
        .addField(`Author`, `${message.author.username}`, true)
        .addField(`Message Content`, `${messagedel}`)
        .addField(`Date`, `${new Date()}`, true)
    loggingchannelmsg.send(delmsgembed)
});


client.on('guildMemberAdd', member => {
    if (config.autorole = "true") {
        const loggingchannel = config.logchannel;
        const autorole = config.autoroleid

        let find = member.guild.roles.get(`${autorole}`)
        if (!autorole) return console.error(`${langauge.autorolenotfound}`)
        if (!member.guild.me.hasPermission("ADMINISTRATOR")) return console.error(`${language.botnoperms}`)
        if (member.roles.has(autorole)) return console.log(`${member.user.username} has role ${config.autorole}, no roles changed!`)
        member.addRole(autorole).catch(console.error);
        var rolename = member.guild.roles.get(`${autorole}`)
        member.send(`${member.guild.name} ${language.autroledm} **${rolename.name}**`)
    } else {
        return;
    }
})

client.on("resume", function (replayed) {
    console.info(`${language.resume} ${replayed}`)
})

client.on("reconnecting", function () {
    console.info(`${language.reconnecting}`)
})


client.on("warn", function (info) {
    console.log(`${langauge.warn} ${info}`)
})

client.on("error", function(err){
    console.error(`${language.error} ${err}`)
})

process.on("uncaughtException", function(err){
    console.error(`${language.exception} ${err}`)
})

//process.on("unhandledRejection", function(err){ 
    //console.error(`${language.rejection} ${err}`)
//})

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(`${config.prefix1}` || `${config.devprefix}`)) return;
    if (!message.member) message.member = message.guild.fetchMember(message)

    const args = message.content.slice(`${config.prefix1.length}`).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return message.reply(`Use ${config.prefix1}cmds or ${config.prefix1}help to get a list of commands!`)

    if (message.content.startsWith(`${config.prefix1}`)) {
        let command = client.commands.get(cmd)
        let aliases = client.aliases.get(cmd)
        if (!command) return message.reply(`${language.cmdnotfound} **${config.prefix1}help**`)
    }

    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, config, language)
})

client.login(`${config.token}`)


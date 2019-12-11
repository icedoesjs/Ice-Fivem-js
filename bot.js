const { Discord, Client, Collection, RichEmbed } = require('discord.js');
const { readdirSync } = require('fs')
const client = new Client({
    disableEveryone: true,
    unknownCommandResponse: true
});
const config = require('./config/config.json')
client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client)
})

client.categories = readdirSync("./commands/")


client.on("ready", () => {
    console.log(`\u001b[31m`, `------------[ ${config.shortname} | Made by IceyyM8 ]------------`)
    console.log(`\u001b[32 m`, `[${config.shortname}] Stats | ${client.users.size} users, ${client.channels.size} channels`)
    console.log(`\u001b[32 m`, `[${config.shortname}] Invite | https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`)
    console.log(`\u001b[32 m`, `[${config.shortname}] The bot connected to the api and is online with a ping of ${client.ping}ms`)
    console.log(`\u001b[31m`, `------------[ ${config.shortname} Bot | Made by IceyyM8 ]------------`)
    client.user.setActivity(`${config.activity}`, {
        type: "LISTENING"
    })
});

client.on('guildMemberAdd', member => {
    const wchannel = member.guild.channels.find(channel => channel.name === `${config.joinchannel}`);
    var color = config.color
    var tag = member.user.tag
    var messages = ['The real', 'The legend', 'Calm Down!', 'OMG,', 'Yooo!', 'Oh no,', 'Wait!' || "Hol up" || "No way," || 'Oh yeah,' || 'Keep in mind' || 'The amazing']
    var randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(`Returned ${randomMessage} for welcomes!`)
    var embed = new RichEmbed()
        .setColor(color)
        .setDescription(`${randomMessage} **${tag}** joined the server`)
    wchannel.send(embed)
})

client.on('guildMemberRemove', member => {
    const channell = member.guild.channels.find(channel => channel.name === `${config.joinchannel}`);
    var tagl = member.user.tag
    var leavemessaged = ['Im sad,', 'Please keep note,', 'The loser', 'Come back!', "Brace yourselves,", 'Whoops!', 'Come back!', 'Party is over!', 'Commander!', 'NOOOOO,', 'Is he lost?']
    var randomLeave = leavemessaged[Math.floor(Math.random() * leavemessaged.length)];
    console.log(`Returned ${randomLeave} for welcomes!`)
    var leaveEmbed = new RichEmbed()
        .setColor(`RED`)
        .setDescription(`${randomLeave} **${tagl}** just left the server!`)
    channell.send(leaveEmbed)
})

client.on('message', message => {
    var args = message.content.split(" ");
    var command = args[0].toLowerCase();
    if (command === `${config.devprefix}restart`) {
        if (!message.member.hasPermission(`${config.mainpermission}`)) return message.reply("Error, you do not have permission!");
        message.channel.send(`Restarting...`)
        message.delete();
        console.clear();
        client.destroy()
        client.login(config.token);
        message.channel.send(`${config.shortname} bot was restarted!`);
        return;
    }
});

client.on('message', message => {
    var args = message.content.split(" ");
    var command = args[0].toLowerCase();
    if (command === `${config.devprefix}kill`) {
        if (!message.member.hasPermission(`${config.mainpermission}`)) return message.reply("Error, you do not have permission!");
        message.channel.send(`Killing ${config.shortname} Bot`)
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
        if (!message.member.hasPermission(`${config.mainpermission}`)) return message.reply("Error, you do not have permission!");
        client.user.setActivity(`${activity}`)
        message.reply(`The bot's activity was updated to ${activity}`)
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
    if (message.cleanContent.startsWith(`${config.prefix1}` || `${config.devprefix}`)) return console.log(`A command was ran in ${message.channel.name}`)
    let delmsgembed = new RichEmbed()
        .setAuthor(`${config.shortname} Discord logs`)
        .setColor(`${config.color}`)
        .setThumbnail(`${config.logo}`)
        .setDescription(`A message was deleted, view info below`)
        .addField(`Channel`, `<#${message.channel.id}>`, true)
        .addField(`Author`, `${message.author.username}`, true)
        .addField(`Message Content`, `${message.cleanContent}`)
        .addField(`Date`, `${new Date()}`, true)
    loggingchannelmsg.send(delmsgembed)
});

client.on("resume", function (replayed) {
    console.info(`[RESUME] Websocket Resumed, ${replayed} events replayed`)
})

client.on("reconnecting", function () {
    console.info(`[CONNECTION] It seems the websocket connection dropped, I reconnected to the websocket`)
})


client.on("warn", function (info) {
    console.log(`[WARN] Bot recieved the following warning: ${info}`)
})

client.on("error", function(err){
    console.error(`[ERROR] Returned an error ${err}`)
})

process.on("uncaughtException", function(err){
    console.error(`[FATAL] Uncaught Exception: ${err}`)
})

process.on("unhandledRejection", function(err){ 
    console.error(`[FATAL] Unhandled Rejection Caught: ${err}`)
})

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(`${config.prefix1}` || `${config.devprefix}`)) return;
    if (!message.member) message.member = message.guild.fetchMember(message)

    const args = message.content.slice(`${config.prefix1.length}`).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return message.reply(`Use ${config.prefix1}cmds or ${config.prefix1}help to get a list of commands!`)

    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args, config)
})

client.login(`${config.token}`)




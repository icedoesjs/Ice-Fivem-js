const { RichEmbed } = require('discord.js')
module.exports = {
        name: "u-info",
        category: "misc",
        description: "Shows info for the user's discord profile",
        run: async (client, message, args, config) => {
            await message.delete();
   let inline = true
   let resence = true
   const status = {
       online: "Online",
       idle: "Idle",
       dnd: " Do Not Disturb",
       offline: "Offline/Invisible"
   }

   const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
   let target = message.mentions.users.first() || message.author

   if (member.user.bot === true) {
       bot = "Yes";
   } else {
       bot = "No";
   }

   let embed = new RichEmbed()
       .setAuthor(`${config.shortname} Information System`)
       .setThumbnail((target.displayAvatarURL))
       .setColor(`${config.color}`)
       .addField("Full Username", `${member.user.tag}`, inline)
       .addField("ID", member.user.id, inline)
       .addField("Nickname", `${member.user.username}`, true)
       .addField("Bot", `${bot}`, inline, true)
       .addField("Status", `${member.user.presence.status}`, inline, true)
       .addField("Playing", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "Not playing"}`, inline, true)
       .addField("Roles", `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "No Roles"}`, true)
       .addField("Joined Discord At", member.user.createdAt)
       .setFooter(`Information about ${member.user.username}`)
       .setTimestamp()

   message.channel.send(embed);
            }}
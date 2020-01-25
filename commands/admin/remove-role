const { RichEmbed } = require('discord.js');
module.exports = {
    name: "removerole",
    category: "admin",
    aliases: ["rr"],
    description: "Remove a role to the tagged user, tag a role!",
    run: async(client, message, args, language) => {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            return message.reply(`${language.noperms}`)
        }
        if (!message.mentions) {
            return message.reply(`Tag a role and a user!`)
        } else if (message.mentions) {
            let findr = message.mentions.roles.first()
            let findu = message.mentions.users.first()
            let user = message.guild.member(findu)
            user.addRole(findr)
            return message.reply(`I removed **${findr.name}** from **${findu.tag}**`)
        }
    }
}

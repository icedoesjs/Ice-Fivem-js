module.exports = {
        name: "purge",
        category: "admin",
        description: "Deletes the said amount of messages",
        run: async (client, message, args, config) => {
            await message.delete();
            
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply(`You do not have permission for this!`)
            }

            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.reply(`I do not have permission to edit messages!`)
            }

            if (!args[0]) {
                return message.reply(`Please provide a number of messages to delete!`)
            }

            if (isNaN(args[0])) {
                return message.reply(`${args[1]} is not a number!`)
            }

            const logerchannel = message.guild.channels.find(channel => channel.name === `${config.logchannel}`);

            if (args[0] !== 0) {
                message.channel.bulkDelete(`${args[0]}`);
                logerchannel.send(`${args[0]} messages were deleted in <#${message.channel.id}>`)
                .catch(error => message.reply(`Attempted to delete ${args[0]} messages but there was an error: ${error}`))
            }
        }
    }


            
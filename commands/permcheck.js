exports.run = (client, message, [permission]) => {
  if (!message.member.roles.has(adminRole.id))
    return message.reply("Permission Denied. You cannot use this command.");
  if(message.guild.members.find("id", client.user.id).hasPermission(permission)) {
    message.reply('Permission granted');
  } else {
    message.reply('No permission');
  }
};

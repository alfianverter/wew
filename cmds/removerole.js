const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("<:tickNo:432418492667396097> | You don't have `MANAGE_ROLES` permissions.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.channel.send(":busts_in_silhouette:  | Couldn't find that user.");
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send(":link:  | Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send(":no_entry_sign:  | Couldn't find that role.");

  if(!rMember.roles.has(gRole.id)) return message.channel.send(":tools:  **| They don't have that role.**");
  await(rMember.removeRole(gRole.id));
  message.channel.send(`RIP, ${rMember} you have lost the ${gRole.name} role!`)
  
}

module.exports.help = {
  name: "removerole"
}

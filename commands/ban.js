module.exports = {
	name: 'ban',
	description: 'This command ban a user',
	help: '!ban @user',
	execute: async (msg, args, client, Discord) => {
		const mention = msg.mentions.users.first();

		if (mention) {
			let member = msg.guild.members.cache.get(mention.id);
			member.ban();

			return msg.channel.send(`<${member.user.username}> has been banned`);
		} else {
			msg.reply('use the correct format `!ban @user`');
		}
	},
};

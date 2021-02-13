module.exports = {
	name: 'kick',
	description: 'This command kicks a user',
	help: '!kick @user',
	execute: async (msg, args, client, Discord) => {
		const mention = msg.mentions.users.first();

		if (mention) {
			let member = msg.guild.members.cache.get(mention.id);
			member.kick();

			return msg.channel.send(`<${member.user.username}> has been kicked`);
		} else {
			msg.reply('use the correct format `!mute @user`');
		}
	},
};

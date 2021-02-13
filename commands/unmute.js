module.exports = {
	name: 'unmute',
	permissions: ['ADMINISTRATOR'],
	description: 'User is silenced',
	help: '!unmute @user',
	execute: (msg, args, client, Discord) => {
		const mention = msg.mentions.users.first();

		if (mention) {
			let main_role = msg.guild.roles.cache.find((role) => role.name === 'Lector');
			let muted_role = msg.guild.roles.cache.find((role) => role.name === '🔇');

			let user = msg.guild.members.cache.get(mention.id);

			if (muted_role) user.roles.remove(muted_role);
			if (main_role) user.roles.add(main_role);
		} else {
			msg.reply('use the correct format `!mute @user`');
		}
	},
};

module.exports = (client) => {
	const guild = client.guilds.cache.get('751147058060197938');
	const channel = guild.channels.cache.get('809897722747420702');

	setInterval(() => {
		const botCount = guild.members.cache.filter((m) => m.user.bot);
		channel.setName(`🤖ㅣBots: ${botCount.size}`).catch((err) => {
			console.log(err);
		});
	}, 300000);
};

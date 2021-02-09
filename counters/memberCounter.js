module.exports = (client) => {
	const guild = client.guilds.cache.get("751147058060197938");
	const channel = guild.channels.cache.get("807270911161532432");

	setInterval(() => {
		const memberCount = guild.memberCount;
		channel.setName(`👨ㅣMembers: ${memberCount}`).catch((err) => {
			console.log(err);
		});
	}, 300000);
};

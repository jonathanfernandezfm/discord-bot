module.exports = {
	name: "auto-role",
	description: "Auto role creator",
	help: "!auto-role emoji @role emoji @role",
	execute: async (msg, args, client, Discord) => {
		const emojis = args.filter((emoji, index) => !(index % 2));
		const roles = args.filter((role, index) => index % 2);

		const message = await msg.channel.send(" 🔽 React here to get roles!");

		emojis.forEach((emoji) => {
			message.react(emoji);
		});

		const collector = message.createReactionCollector(
			(reaction, user) => {
				if (
					reaction.emoji.id &&
					!emojis.includes(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
				) {
					reaction.remove();
					return false;
				}
				if (!reaction.emoji.id && !emojis.includes(reaction.emoji.name)) {
					reaction.remove();
					return false;
				}
				return !user.bot;
			},
			{ dispose: true }
		);

		collector.on("collect", (reaction, user) => {
			const index = reaction.emoji.id
				? emojis.indexOf(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
				: emojis.indexOf(reaction.emoji.name);
			const member = msg.guild.members.cache.get(user.id);
			member.roles.add(roles[index].substring(3, roles[index].length - 1));
		});

		collector.on("remove", (reaction, user) => {
			const index = reaction.emoji.id
				? emojis.indexOf(`<:${reaction.emoji.name}:${reaction.emoji.id}>`)
				: emojis.indexOf(reaction.emoji.name);
			const member = msg.guild.members.cache.get(user.id);
			member.roles.remove(roles[index].substring(3, roles[index].length - 1));
		});
	},
};

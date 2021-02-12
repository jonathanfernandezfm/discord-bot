module.exports = {
	name: "mute",
	permissions: ["ADMINISTRATOR"],
	description: "User is silenced",
	help: "!mute @user",
	execute: (msg, args, client, Discord) => {
		const mention = msg.mentions.users.first();
		const time = args[1];

		if (mention) {
			let main_role = msg.guild.roles.cache.find((role) => role.name === "Lector");
			let muted_role = msg.guild.roles.cache.find((role) => role.name === "🔇");

			let member = msg.guild.members.cache.get(mention.id);

			if (main_role) member.roles.remove(main_role);
			if (muted_role) member.roles.add(muted_role);

			if (time) {
				setTimeout(() => {
					if (muted_role) member.roles.remove(muted_role);
					if (main_role) member.roles.add(main_role);
				}, time * 1000);

				return msg.channel.send(`<@${member.user.id}> has been muted for ${time} seconds`);
			}

			return msg.channel.send(`<@${member.user.id}> has been muted`);
		} else {
			msg.reply("use the correct format `!mute @user`");
		}
	},
};

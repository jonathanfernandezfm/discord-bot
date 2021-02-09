const cooldowns = new Map();

module.exports = (Discord, client, message) => {
	const prefix = "!";

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();

	const command =
		client.commands.get(cmd) ||
		client.commands.find((command) => command.aliases && command.aliases.includes(cmd));

	if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Discord.Collection());

	const currentTime = Date.now();
	const timeStamps = cooldowns.get(command.name);
	const cooldownAmount = command.cooldown * 1000;

	if (timeStamps.has(message.author.id)) {
		const expirationTime = timeStamps.get(message.author.id) + cooldownAmount;

		if (currentTime < expirationTime) {
			const timeLeft = (expirationTime - currentTime) / 1000;

			return message.reply(
				`Wait ${timeLeft.toFixed(1)} seconds before using command \`${command.name}\` again`
			);
		}
	}

	timeStamps.set(message.author.id, currentTime);
	setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args, client, Discord);
	} catch (err) {
		message.reply("There was an error executing this command. 😫");
		console.log(err);
	}
};

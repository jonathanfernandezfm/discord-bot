const translatte = require("translatte");

module.exports = {
	name: "translate",
	description: "Bot translate text given or from message referenced",
	aliases: ["tr"],
	help: "!translate {language} {text}",
	execute: async (msg, args, client, Discord) => {
		if ((!msg.reference && !args.length) || (!msg.referece && args.length === 1))
			return msg.reply(
				`use the correct format \`!translate {language} {text}\` or \`!translate {language}\` when responding a message`
			);

		const language = args.shift() || "en";
		const text = msg.reference
			? (await msg.channel.messages.fetch(msg.reference.messageID)).content
			: args.join(" ");

		try {
			const translation = await translatte(text, { to: language });
			return msg.channel.send(translation.text);
		} catch (err) {
			if (err.message && err.message.includes("not supported"))
				return msg.reply(`\`${language}\` is not supported`);
			throw err;
		}
	},
};

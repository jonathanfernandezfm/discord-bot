var Scraper = require("images-scraper");

const google = new Scraper({
	puppeteer: {
		headless: true,
	},
});

module.exports = {
	name: "image",
	description: "Bot responds with an image from Google matching the query",
	aliases: [],
	cooldown: 10,
	help: "!image {query}",
	execute: async (msg, args, client, Discord) => {
		if (!args.length) return msg.reply(`use the correct format \`!image {query}\``);
		const query = args.join(" ");

		const message = await msg.channel.send("Searching...");
		try {
			const results = await google.scrape(query, 1);
			message.edit(results[0].url);
		} catch (err) {
			console.log(err);
			message.edit("An error has ocurred.");
		}
	},
};

const memberCounter = require("../../counters/memberCounter");
const botCounter = require("../../counters/botCounter");

module.exports = (Discord, client) => {
	console.log("Bot is online!");

	memberCounter(client);
	botCounter(client);

	client.user
		.setActivity("!help", {
			type: "PLAYING",
		})
		.catch(console.error);
};

const memberCounter = require("../../counters/memberCounter");

module.exports = (Discord, client) => {
	console.log("Bot is online!");

	memberCounter(client);

	client.user
		.setActivity("!help", {
			type: "PLAYING",
		})
		.catch(console.error);
};

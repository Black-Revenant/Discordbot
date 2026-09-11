const store = require("../store");

module.exports = {
    name: "config",

    async execute(interaction) {

        const settings = store.getSettings();

        await interaction.reply(
            `🛡️ Moderation **${settings.moderation ? "ON" : "OFF"}** · ` +
            `Anti-spam **${settings.antiSpam ? "ON" : "OFF"}** · ` +
            `Anti-scam **${settings.antiScam ? "ON" : "OFF"}** · ` +
            `Leveling **${settings.leveling ? "ON" : "OFF"}**`
        );

    }
};
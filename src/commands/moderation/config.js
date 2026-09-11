const { SlashCommandBuilder } = require("discord.js");
const store = require("../../store");

module.exports = {
    name: "config",

    data: new SlashCommandBuilder()
        .setName("config")
        .setDescription("View the current bot configuration"),

    async execute(interaction) {

        const settings = store.getSettings();

        await interaction.reply({
            embeds: [
                {
                    color: 0x5865F2,
                    title: "⚙️ Dark Syndicate Configuration",
                    fields: [
                        {
                            name: "🛡️ Moderation",
                            value: settings.moderation ? "✅ Enabled" : "❌ Disabled",
                            inline: true
                        },
                        {
                            name: "🚫 Anti-Spam",
                            value: settings.antiSpam ? "✅ Enabled" : "❌ Disabled",
                            inline: true
                        },
                        {
                            name: "🔒 Anti-Scam",
                            value: settings.antiScam ? "✅ Enabled" : "❌ Disabled",
                            inline: true
                        },
                        {
                            name: "📈 Leveling",
                            value: settings.leveling ? "✅ Enabled" : "❌ Disabled",
                            inline: true
                        }
                    ],
                    footer: {
                        text: "Dark Syndicate Bot"
                    },
                    timestamp: new Date()
                }
            ]
        });

    }
};
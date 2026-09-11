const { PermissionFlagsBits } = require("discord.js");
const store = require("../store");

module.exports = {
    name: "warn",

    async execute(interaction) {

        if (!interaction.memberPermissions?.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply({
                content: "❌ You need the **Moderate Members** permission.",
                ephemeral: true
            });
        }

        const member = interaction.options.getMember("user");
        const reason = interaction.options.getString("reason");

        if (!member || member.user.bot) {
            return interaction.reply({
                content: "❌ Choose a real server member, not a bot.",
                ephemeral: true
            });
        }

        if (member.id === interaction.user.id) {
            return interaction.reply({
                content: "❌ You cannot warn yourself.",
                ephemeral: true
            });
        }

        store.addWarning(
            member.id,
            interaction.user.id,
            reason
        );

        await interaction.reply(
            `⚠️ **${member.user.username}** was warned.\nReason: **${reason}**`
        );

    }
};
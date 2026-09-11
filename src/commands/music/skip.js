const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "skip",

    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skip the current song"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                content: "❌ Nothing is playing.",
                ephemeral: true
            });
        }

        queue.node.skip();

        await interaction.reply("⏭️ Song skipped.");
    }
};
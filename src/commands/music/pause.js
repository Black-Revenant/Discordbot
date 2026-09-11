const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "pause",

    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pause the current song"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                content: "❌ Nothing is playing.",
                ephemeral: true
            });
        }

        queue.node.pause();

        await interaction.reply("⏸️ Music paused.");
    }
};
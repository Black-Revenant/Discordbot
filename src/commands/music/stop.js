const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "stop",

    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stop the current song and clear the queue"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue) {
            return interaction.reply({
                content: "❌ Nothing is playing.",
                flags: 64
            });
        }

        try {

            // Clear all queued songs
            queue.tracks.clear();

            // Stop the current song
            queue.node.stop();

            // Do NOT call queue.delete()

            return interaction.reply({
                content: "⏹️ Stopped the current song and cleared the queue."
            });

        } catch (error) {

            console.error(error);

            return interaction.reply({
                content: "❌ Failed to stop the music.",
                flags: 64
            });
        }
    }
};
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "songinfo",

    data: new SlashCommandBuilder()
        .setName("songinfo")
        .setDescription("Shows information about the current song"),

    async execute(interaction) {

        const queue = interaction.client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack) {
            return interaction.reply({
                content: "❌ Nothing is playing.",
                ephemeral: true
            });
        }

        const track = queue.currentTrack;

        const embed = new EmbedBuilder()
            .setColor("Blurple")
            .setTitle("🎵 Current Song")
            .setThumbnail(track.thumbnail)
            .addFields(
                { name: "Title", value: track.title },
                { name: "Artist", value: track.author, inline: true },
                { name: "Duration", value: track.duration, inline: true },
                { name: "Requested By", value: `${track.requestedBy}`, inline: true },
                { name: "URL", value: track.url }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });

    }
};
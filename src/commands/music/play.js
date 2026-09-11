const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "play",

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play a song from YouTube or Spotify")
        .addStringOption(option =>
            option
                .setName("query")
                .setDescription("Song name, YouTube URL or Spotify URL")
                .setRequired(true)
        ),

    async execute(interaction) {

        const query = interaction.options.getString("query");
        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: "❌ You must join a voice channel first.",
                ephemeral: true
            });
        }

        await interaction.deferReply();

        try {

    const { track } = await interaction.client.player.play(
        voiceChannel,
        query,
        {
            nodeOptions: {
                metadata: interaction.channel,
                leaveOnEmpty: false,
                leaveOnEmptyCooldown: 30000,
                leaveOnEnd: false,
                leaveOnEndCooldown: 30000,
                leaveOnStop: false
            },
            requestedBy: interaction.user
        }
    );

    await interaction.editReply({
        embeds: [{
            color: 0x57F287,
            title: "🎵 Added to Queue",
            description: `**${track.title}**`,
            thumbnail: {
                url: track.thumbnail
            },
            fields: [
                {
                    name: "Artist",
                    value: track.author,
                    inline: true
                },
                {
                    name: "Duration",
                    value: track.duration,
                    inline: true
                },
                {
                    name: "Requested By",
                    value: `<@${interaction.user.id}>`,
                    inline: true
                }
            ],
            footer: {
                text: "Spidy Bot Music"
            },
            timestamp: new Date()
        }]
    });

} catch (err) {

    console.error(err);

    await interaction.editReply({
        content: "❌ Unable to play this song."
    });

}}}
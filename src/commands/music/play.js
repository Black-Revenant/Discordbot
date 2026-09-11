const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    name: "play",

    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Play music from YouTube or Spotify")
        .addStringOption(option =>
            option
                .setName("query")
                .setDescription("Song name, YouTube URL or Spotify URL")
                .setRequired(true)
        ),

    async execute(interaction) {

        const voiceChannel = interaction.member.voice.channel;

        if (!voiceChannel) {
            return interaction.reply({
                content: "❌ Join a voice channel first.",
                ephemeral: true
            });
        }

        let query = interaction.options.getString("query");

        // Force YouTube search for normal text
        if (
            !query.startsWith("http://") &&
            !query.startsWith("https://")
        ) {
            query = `ytsearch:${query}`;
        }

        await interaction.deferReply();

        try {

            const result = await interaction.client.player.play(
                voiceChannel,
                query,
                {
                    requestedBy: interaction.user,

                    nodeOptions: {
                        metadata: interaction.channel,

                        leaveOnEmpty: false,
                        leaveOnEnd: false,
                        leaveOnStop: false,

                        leaveOnEmptyCooldown: 30000,
                        leaveOnEndCooldown: 30000,

                        bufferingTimeout: 15000,
                        skipOnNoStream: true
                    }
                }
            );

            if (!result.track) {
                return interaction.editReply(
                    "❌ No playable result found."
                );
            }

            const track = result.track;

            await interaction.editReply({
                embeds: [
                    {
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
                            text: "Dark Syndicate Music"
                        },
                        timestamp: new Date()
                    }
                ]
            });

        } catch (err) {

            console.error(err);

            await interaction.editReply(
                "❌ Unable to play this song."
            );
        }
    }
};
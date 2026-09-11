const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = (client) => {

    const guildId = process.env.AUTO_GUILD_ID;
    const voiceChannelId = process.env.AUTO_VOICE_CHANNEL_ID;

    const guild = client.guilds.cache.get(guildId);

    if (!guild) {
        console.log("❌ Guild not found");
        return;
    }

    const channel = guild.channels.cache.get(voiceChannelId);

    if (!channel || !channel.isVoiceBased()) {
        console.log("❌ Voice channel not found");
        return;
    }

    joinVoiceChannel({
        channelId: channel.id,
        guildId: guild.id,
        adapterCreator: guild.voiceAdapterCreator,
        selfDeaf: false,
        selfMute: false
    });

    console.log(`✅ Joined ${channel.name}`);
};
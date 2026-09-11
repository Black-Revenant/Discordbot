const { setupPlayer } = require("../music/player");
const autoJoin = require("../voice/autoJoin");

module.exports = (client, registerCommands) => {

    client.once("clientReady", async () => {

        try {

            await setupPlayer(client);

            await registerCommands();

            autoJoin(client);

            console.log(`✅ ${client.user.tag} is online`);

        } catch (err) {

            console.error("Startup Error:", err);

        }

    });

};
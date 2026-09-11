const { setupPlayer } = require("../music/player");


module.exports = (client, registerCommands) => {

    client.once("clientReady", async () => {

        try {

            await setupPlayer(client);

            await registerCommands();

           

            console.log(`✅ ${client.user.tag} is online`);

        } catch (err) {

            console.error("Startup Error:", err);

        }

    });

};
const autoJoin=require("../voice/autoJoin");

module.exports=(client,registerCommands)=>{

client.once("clientReady",async()=>{

await registerCommands();

console.log(`✅ ${client.user.tag} is online`);

autoJoin(client);

});

};
const { Client, GatewayIntentBits } = require("discord.js");

exports.sendMessage = async (message) => {
  const channelId = process.env.CHANNEL_ID;
  // Create a new client instance
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  // Log in to Discord with your client's token
  await client.login(process.env.BOT_TOKEN);
  // send the message
  const channel = await client.channels.fetch(channelId);
  const messageRef = await channel.send(message);

  // destroy the client
  await client.destroy();

  // return the message reference
  return messageRef;
};

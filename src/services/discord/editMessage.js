const { fetchMessageById } = require("./fetchMessageById");
const { Client, GatewayIntentBits } = require("discord.js");

exports.editMessage = async (newMessage, messageId) => {
  // Create a new client instance
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  // Log in to Discord with your client's token
  await client.login(process.env.BOT_TOKEN);
  // fetch the message
  const messageRef = await fetchMessageById(messageId);
  // edit the message
  messageRef.edit(newMessage);
  // destroy the client
  await client.destroy();
};

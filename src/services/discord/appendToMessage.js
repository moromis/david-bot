const { fetchMessageById } = require("./fetchMessageById");
const { Client, GatewayIntentBits } = require("discord.js");

exports.appendToMessage = async (textToAppend, messageId) => {
  // Create a new client instance
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });
  // Log in to Discord with your client's token
  await client.login(process.env.BOT_TOKEN);
  // fetch the message
  const messageRef = await fetchMessageById(messageId);
  // append to the message
  messageRef.edit(`${messageRef.content}\n${textToAppend}`);
  // destroy the client
  await client.destroy();
};

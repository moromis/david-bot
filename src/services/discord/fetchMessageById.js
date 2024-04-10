exports.fetchMessageById = async (client, messageId) => {
  const channelId = process.env.CHANNEL_ID;
  // fetch the message
  const channel = await client.channels.fetch(channelId);
  const messageRef = await channel.messages.fetch(messageId);
  return messageRef;
};

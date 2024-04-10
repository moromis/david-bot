const { TABLE_NAME, WEEKLY_MESSAGE_DB_ID } = require("../main/const");
const { SIGNUP_SHEET_HEADER } = require("../main/strings");
const services = require("../services");
// const dayjs = require("dayjs");

exports.handler = async () => {
  // unpin the old weekly signup sheet
  const { discordId } = await services.getSignupMessage();
  const discordMessageRef = await services.discord.fetchMessageById(discordId);
  await discordMessageRef.unpin();
  // clear the data table
  await services.db.clear(TABLE_NAME);
  // send the new signup sheet, pin it
  const newSignupMessage =
    await services.discord.sendMessage(SIGNUP_SHEET_HEADER);
  await newSignupMessage.pin();
  await services.db.put(TABLE_NAME, {
    id: WEEKLY_MESSAGE_DB_ID,
    discordId: newSignupMessage.id,
  });
};

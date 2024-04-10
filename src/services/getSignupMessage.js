const { db } = require(".");
const { TABLE_NAME, WEEKLY_MESSAGE_DB_ID } = require("../main/const");

exports.getSignupMessage = async () => {
  return await db.getItem(TABLE_NAME, WEEKLY_MESSAGE_DB_ID);
};

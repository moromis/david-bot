const { TABLE_NAME, WEEKLY_MESSAGE_ID } = require("../main/const");
const db = require("./db");

exports.getAllUsers = async () => {
  // get all users from DynamoDB
  const allItems = await db.getAll(TABLE_NAME);
  return allItems.filter((x) => x.id !== WEEKLY_MESSAGE_ID);
};

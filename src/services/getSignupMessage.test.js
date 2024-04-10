const { db } = require(".");
const { TABLE_NAME, WEEKLY_MESSAGE_DB_ID } = require("../main/const");
const { getSignupMessage } = require("./getSignupMessage");

jest.mock("../services");

describe("getSignupMessage", () => {
  it("should get the message from the db", async () => {
    await getSignupMessage();
    expect(db.getItem).toHaveBeenCalledWith(TABLE_NAME, WEEKLY_MESSAGE_DB_ID);
  });
});

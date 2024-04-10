const { getAllUsers } = require("./getAllUsers");
const db = require("../services/db");
const {
  getTestDiscordUsers,
  getTestUsers,
} = require("../test-fixtures/fixtures");
const { WEEKLY_MESSAGE_ID } = require("../main/const");

jest.mock("../services/db");

describe("getAllUsers", () => {
  it("should get all users", async () => {
    const testUsers = getTestUsers();
    db.getAll.mockReturnValue(testUsers);
    const res = await getAllUsers();
    expect(res).toEqual(testUsers);
    expect(db.getAll.mock.calls.length).toBe(1);
  });
  it("should ignore the weekly message item in the DB", async () => {
    const testUsers = getTestUsers();
    db.getAll.mockReturnValue([...testUsers, { id: WEEKLY_MESSAGE_ID }]);
    const res = await getAllUsers();
    expect(res).toEqual(testUsers);
  });
});

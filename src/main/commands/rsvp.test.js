const { testRsvpBody } = require("../../test-fixtures/fixtures");
const { db, getSignupMessage, discord } = require("../../services");
const { rsvp } = require("./rsvp");

jest.mock("../../services");
getSignupMessage.mockReturnValue({
  discordId: "test",
});

db.put.mockImplementation(() => {
  return new Promise((resolve) => {
    process.nextTick(() => resolve(testRsvpBody));
  });
});

describe("rsvp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return with status code 200", async () => {
    const result = await rsvp(testRsvpBody);
    expect(result.statusCode).toBe(200);
  });
  it("should write the response to the database", async () => {
    await rsvp(testRsvpBody);
    expect(db.put).toHaveBeenCalledTimes(1);
  });
  it("should return 401 statusCode if writing to the DB errors", async () => {
    db.put.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        process.nextTick(() => reject(new Error("broken")));
      });
    });
    const result = await rsvp(testRsvpBody);
    expect(result).toHaveProperty("body");
    expect(result.statusCode).toBe(401);
  });
  it("should append to the current signup message", async () => {
    const result = await rsvp(testRsvpBody);
    expect(discord.appendToMessage).toHaveBeenCalled();
  });
});

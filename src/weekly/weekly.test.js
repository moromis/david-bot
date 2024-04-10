const { handler } = require("./weekly");
const services = require("../services");
const { TABLE_NAME, WEEKLY_MESSAGE_DB_ID } = require("../main/const");

jest.mock("../services");
services.getSignupMessage.mockReturnValue({
  discordId: "test",
});

describe("weekly", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should unpin the old message", async () => {
    const unpinSpy = jest.fn();
    services.discord.fetchMessageById.mockReturnValue({
      unpin: unpinSpy,
    });
    services.discord.sendMessage.mockReturnValue({
      pin: jest.fn(),
    });
    await handler();
    expect(unpinSpy).toHaveBeenCalledTimes(1);
  });
  it("should pin the new message", async () => {
    const pinSpy = jest.fn();
    services.discord.fetchMessageById.mockReturnValue({
      unpin: jest.fn(),
    });
    services.discord.sendMessage.mockReturnValue({
      pin: pinSpy,
    });
    await handler();
    expect(pinSpy).toHaveBeenCalledTimes(1);
  });
  it("should put the new message into the DB", async () => {
    const testId = "test-id";
    services.discord.fetchMessageById.mockReturnValue({
      unpin: jest.fn(),
    });
    services.discord.sendMessage.mockReturnValue({
      id: testId,
      pin: jest.fn(),
    });
    await handler();
    expect(services.db.put).toHaveBeenCalledWith(TABLE_NAME, {
      id: WEEKLY_MESSAGE_DB_ID,
      discordId: testId,
    });
  });
});

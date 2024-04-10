const { Client } = require("discord.js");
const { appendToMessage } = require("./appendToMessage");
const { fetchMessageById } = require("./fetchMessageById");

jest.mock("discord.js", () => ({
  Client: jest.fn().mockImplementation(() => ({
    login: jest.fn(() => {}),
    destroy: jest.fn(() => {}),
  })),
  GatewayIntentBits: {
    Guilds: "guilds",
    GuildMembers: "guild-members",
  },
}));

const mockEditSpy = jest.fn();
jest.mock("./fetchMessageById");
fetchMessageById.mockImplementation(() => ({
  edit: mockEditSpy,
}));

const testMessage = "test";
const testMessageId = "test-id";

describe("appendToMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should run and then destroy the discord client", async () => {
    await appendToMessage(testMessage, testMessageId);
    expect(Client).toHaveBeenCalled();
    expect(Client.mock.results[0].value.destroy).toHaveBeenCalledTimes(1);
  });
  it("should edit a message to the given channel", async () => {
    await appendToMessage(testMessage, testMessageId);
    expect(mockEditSpy).toHaveBeenCalledTimes(1);
    expect(mockEditSpy).toHaveBeenCalled();
  });
});

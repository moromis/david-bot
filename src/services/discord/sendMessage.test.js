const { Client } = require("discord.js");
const { sendMessage } = require("./sendMessage");

const mockSend = jest.fn();
jest.mock("discord.js", () => ({
  Client: jest.fn().mockImplementation(() => ({
    login: jest.fn(() => {}),
    destroy: jest.fn(() => {}),
    channels: {
      fetch: jest.fn(() => ({
        send: mockSend,
      })),
    },
  })),
  GatewayIntentBits: {
    Guilds: "guilds",
    GuildMembers: "guild-members",
  },
}));

const testMessage = "test";

describe("sendMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should run and then destroy the discord client", async () => {
    await sendMessage(testMessage);
    expect(Client).toHaveBeenCalled();
    expect(Client.mock.results[0].value.destroy).toHaveBeenCalledTimes(1);
  });
  it("should send a message to the given channel", async () => {
    await sendMessage(testMessage);
    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith(testMessage);
  });
});

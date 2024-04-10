const { fetchMessageById } = require("./fetchMessageById");

describe("appendToMessage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should run", async () => {
    const testMessageRef = "test";
    const clientSpy = {
      channels: {
        fetch: jest.fn(() => ({
          messages: {
            fetch: jest.fn(() => testMessageRef),
          },
        })),
      },
    };
    const messageRef = await fetchMessageById(clientSpy);
    expect(messageRef).toBe(testMessageRef);
  });
});

const nacl = require("tweetnacl");
const { handler } = require(".");
const { data, rsvp } = require("./commands/rsvp");

jest.mock("tweetnacl");
jest.mock("../lambda/commands/rsvp", () => ({
  rsvp: jest.fn(),
  data: jest.requireActual("../lambda/commands/rsvp").data,
}));

const getTestEvent = (dataName, type = 1) => ({
  headers: { "x-signature-ed25519": "test", "x-signature-timestamp": "test" },
  body: JSON.stringify({
    type,
    data: {
      name: dataName,
    },
  }),
});

describe("index", () => {
  const originalEnv = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      ...originalEnv,
      PUBLIC_KEY: "test",
    };
  });
  afterEach(() => {
    process.env = originalEnv;
  });
  it("should return 401 if not verified", async () => {
    nacl.sign.detached.verify.mockReturnValue(false);
    const result = await handler(getTestEvent());
    expect(result.statusCode).toBe(401);
  });
  it("should respond to ping with correct response", async () => {
    nacl.sign.detached.verify.mockReturnValue(true);
    const result = await handler(getTestEvent());
    expect(result.statusCode).toBe(200);
    expect(typeof result.body).toBe("string");
    expect(JSON.parse(result.body).type).toBe(1);
  });
  it("should respond to rsvp and call the rsvp function", async () => {
    nacl.sign.detached.verify.mockReturnValue(true);
    const testEvent = getTestEvent(data.name, 2);
    await handler(testEvent);
    expect(rsvp).toHaveBeenCalledTimes(1);
  });
  it("should respond to an unknown command with 404", async () => {
    nacl.sign.detached.verify.mockReturnValue(true);
    const testEvent = getTestEvent("nunya", 2);
    const result = await handler(testEvent);
    expect(result.statusCode).toBe(404);
  });
});

const { testRsvpBody } = require("../../test-fixtures/fixtures");
const { db } = require("../services");
const { rsvp } = require("./rsvp");

jest.mock("../services/db");

describe("rsvp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should return with status code 200", () => {
    const result = rsvp(testRsvpBody);
    expect(result.statusCode).toBe(200);
  });
  it("should write the response to the database", () => {
    rsvp(testRsvpBody);
    expect(db.put).toHaveBeenCalledTimes(1);
  });
});

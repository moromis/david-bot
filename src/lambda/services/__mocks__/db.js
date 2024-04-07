const { testRsvpBody } = require("../../../test-fixtures/fixtures");

// eslint-disable-next-line no-undef
exports.put = jest.fn(() => {
  return new Promise((resolve) => {
    process.nextTick(() => resolve(testRsvpBody));
  });
});

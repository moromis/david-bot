exports.rsvp = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      type: 4,
      data: {
        content: "You've responded with __",
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

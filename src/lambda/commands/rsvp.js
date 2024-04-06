const { RESPONSES, TABLE_NAME } = require("../const");
const { db } = require("../services");

exports.data = {
  name: "rsvp",
  description: "RSVP for this week's meetup",
  options: [
    {
      name: "response",
      description: "Are you coming this week?",
      type: 3,
      required: true,
      choices: [
        {
          name: "Yes",
          value: RESPONSES.YES,
        },
        {
          name: "No",
          value: RESPONSES.NO,
        },
        {
          name: "Maybe",
          value: RESPONSES.MAYBE,
        },
      ],
    },
  ],
};

exports.rsvp = (body) => {
  const response = body.data.options[0].value;
  db.put(TABLE_NAME, {
    user: body.member.id,
    response,
  });
  return {
    statusCode: 200,
    body: JSON.stringify({
      type: 4,
      data: {
        content: `You've responded with ${response}`,
      },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

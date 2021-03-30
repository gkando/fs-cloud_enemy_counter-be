const EventParser = require("../api/lib/event-parser");
const createEvent = require("./helpers/mock-event.js");

describe("EventParser.parse() ", () => {
  test("test 1 > returns parsed array of events if event has required params", async () => {
    var data = [
      {
        playerId: "nL5pSEK3D8p0q_hLSBvUO",
        kills: 55,
      },
      {
        playerId: "V2YGt6PXMAbFAanhEamuQ",
        kills: 26,
      },
    ];

    const event = createEvent(data);
    expect.assertions(1);
    const result = await EventParser.parse(event.body);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ playerId: "nL5pSEK3D8p0q_hLSBvUO" }),
        expect.objectContaining({ playerId: "V2YGt6PXMAbFAanhEamuQ" }),
      ])
    );
  });
  test("test 2 > throws error when body is not an array or is an empty array", async () => {
    const body = [];
    expect.assertions(1);
    await expect(EventParser.parse(body)).rejects.toEqual({
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: '{\n  "message": "Missing game events data."\n}',
    });
  });

  test("test 3 > throws error when event is missing a required field", async () => {
    const event = {
      body: [
        {
          playerId: "jq9TTXZpsoH1YGr5osSVU",
        },
        {
          playerId: "VYGt6PXMAbFAanzhEamuQ",
          kills: 10,
        },
      ],
    };
    await expect(EventParser.parse(event.body)).rejects.toEqual({
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: '{\n  "message": "[0].kills is required"\n}',
    });
    expect.assertions(1);
  });
});

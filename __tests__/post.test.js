const EventParser = require("../api/lib/event-parser");

describe("EventParser.parse() ", () => {
  test("returns parsed array of events if event has required params", async () => {
    const payload = {
      body: [
        {
          playerId: "jq9TTXZpsoH1YGr5osSVU",
          kills: 186,
        },
        {
          playerId: "VYGt6PXMAbFAanzhEamuQ",
          kills: 26,
        },
      ],
    };

    const result = EventParser.parse(payload);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ playerId: "jq9TTXZpsoH1YGr5osSVU" }),
        expect.objectContaining({ playerId: "VYGt6PXMAbFAanzhEamuQ" }),
      ])
    );
  });
  test("throws error when event object missing body", async () => {
    const payload = {};
    expect(() => EventParser.parse(payload)).toThrow();
  });
  test("throws error when event is missing a required param", async () => {
    const payload = {
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
    expect(() => EventParser.parse(payload)).toThrow();
  });
});

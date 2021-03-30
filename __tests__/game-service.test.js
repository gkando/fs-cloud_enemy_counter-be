const GameEventService = require("../api/lib/game-event-service");

describe("GameEventService.create() ", () => {
  test("example 1 > we should have a PutRequest object containing an Item object with the data from payload[0]", async () => {
    const payload = [
      {
        playerId: "jq9TTXZpsoH1YGr5osSVU",
        kills: 186,
      },
      {
        playerId: "VYGt6PXMAbFAanzhEamuQ",
        kills: 26,
      },
    ];
    expect.assertions(1);
    const result = await GameEventService.create(payload);
    expect(result[0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          PutRequest: {
            Item: {
              kills: 186,
              playerId: "jq9TTXZpsoH1YGr5osSVU",
              timestamp: expect.any(String),
            },
          },
        }),
      ])
    );
  });
});

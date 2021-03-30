const GameEventService = require("../api/lib/game-event-service");
const payload = [
  {
    playerId: "nL5pSEK3D8p0q_hLSBvUO",
    kills: 184,
  },
  {
    playerId: "l_Ofz7N63LLRK5YcKvS4T",
    kills: 94,
  },
  {
    playerId: "GRcqyWfClDCpw6gSU7zMu",
    kills: 14,
  },
  {
    playerId: "jq9TTXZpsoH1YGr5osSVU",
    kills: 186,
  },
  {
    playerId: "VYGt6PXMAbFAanzhEamuQ",
    kills: 26,
  },
  {
    playerId: "tRUY6o1Gn_rQWfY9-kMYu",
    kills: 37,
  },
  {
    playerId: "eFGF9am5DGWbjyHNcnC5D",
    kills: 95,
  },
  {
    playerId: "i8MSSYxJj4ylO6uuHtj2H",
    kills: 66,
  },
  {
    playerId: "zp8pSuD3D8p0q_hLSBvUO",
    kills: 98,
  },
  {
    playerId: "l_Ofz7N63LLRK5YcKvS4T",
    kills: 71,
  },
];
describe("GameEventService.create() ", () => {
  test("test 1 > we should have a PutRequest object containing an Item object with the data from payload[0]", async () => {
    const result = await GameEventService.create(payload);
    expect(result[0]).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          PutRequest: {
            Item: {
              kills: 184,
              playerId: "nL5pSEK3D8p0q_hLSBvUO",
              timestamp: expect.any(String),
            },
          },
        }),
      ])
    );
  });

  test("test 2 > returns an array containing two arrays", async () => {
    const result = await GameEventService.create(payload);
    expect(result.length).toBe(2);
  });

  test("test 3 > each array contains 5 items", async () => {
    const result = await GameEventService.create(payload);
    result.forEach((arr) => {
      expect(arr.length).toBe(5);
    });
  });
});

const MAX_BATCH = 5;

exports.create = async (gameEvents) => {
  let players = [];
  gameEvents.forEach((item) => {
    players.push({
      PutRequest: {
        Item: {
          playerId: item["playerId"],
          kills: item["kills"],
          timestamp: new Date().toISOString(),
        },
      },
    });
  });
  // dynamoDb batchWrite requirements:
  //    Array Members: Minimum number of 1 item. Maximum number of 25 items.
  //    Set max value lower to demonstrate array chunking
  const chunk = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  const chunks = chunk(players, MAX_BATCH);
  return chunks;
};

const { EventParser, GameEventService, DynamoService } = require("./lib");

// handles incoming player kill updates from game server
module.exports.handler = async (event) => {
  console.log("EVENT INIT");
  try {
    const payload = await EventParser.parse(event);
    console.log("PAYLOAD", payload);
    const chunks = await GameEventService.create(payload);
    console.log("handler: ", chunks);
    await DynamoService.batchWrite(chunks);
    return {
      statusCode: 201,
      body: JSON.stringify(
        {
          response: {
            success: true,
          },
        },
        null,
        2
      ),
    };
  } catch (error) {
    return error;
  }
};

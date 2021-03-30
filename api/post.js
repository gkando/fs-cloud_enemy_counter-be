const { EventParser, GameEventService, DynamoService, response } = require("./lib");

// handles incoming player kill updates from game server
module.exports.handler = async (event) => {
  console.log("EVENT INIT", event);
  // cast body for consistency with testing and prod
  const body = typeof event.body == "string" ? JSON.parse(event.body) : event.body;
  try {
    const payload = await EventParser.parse(body);
    const chunks = await GameEventService.create(payload);
    await DynamoService.batchWrite(chunks);
    return response.json({ response: { success: true } }, 201);
  } catch (error) {
    return error;
  }
};

const { EventParser, GameEventService, DynamoService, Response } = require("./lib");

// handles incoming player kill updates from game server
module.exports.handler = async (event) => {
  // cast body for consistency with testing and prod
  const body = typeof event.body == "string" ? JSON.parse(event.body) : event.body;
  try {
    const payload = await EventParser.parse(body);
    const chunks = await GameEventService.create(payload);
    await DynamoService.batchWrite(chunks);
    return Response.success({ events_added: payload.length });
  } catch (err) {
    return err;
  }
};

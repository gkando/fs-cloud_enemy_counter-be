const apiGateway = require("./apiGateway.json");

module.exports = function createEvent(data) {
  const event = Object.assign({}, apiGateway, { body: data });
  return event;
};

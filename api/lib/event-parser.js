const Joi = require("joi");
const response = require("./response.js");

const eventSchema = Joi.object({
  playerId: Joi.string().alphanum().required(),
  kills: Joi.number().min(1).required(),
});
const extractEvent = (event) => event.body[0];

exports.parse = async (event) => {
  console.log("EVENT BODY", event.body);
  // If we do not receive a body, we cannot continue...
  if (!event.body) {
    // ...so we return a Bad Request response
    throw Error(response.json("Missing game events data.", 400));
  }
  // validate the first item in the events array
  try {
    const eventObject = extractEvent(event);
    const { value: payload, error } = eventSchema.validate(eventObject);
    return event.body;
  } catch (error) {
    throw Error(`Payload error => ${error}.`);
  }
};

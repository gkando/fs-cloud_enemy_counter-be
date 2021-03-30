module.exports = class Response {
  static send(statusCode, data) {
    return {
      statusCode,
      headers: {
        "Access-Control-Allow-Origin": "*", // required for CORS support to work
      },
      body: JSON.stringify(data, null, 2),
    };
  }

  static success(message) {
    return this.send(200, message);
  }

  static internalError(message) {
    return this.send(500, message);
  }

  static invalidData(message) {
    return this.send(400, { message });
  }
};

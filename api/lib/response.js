module.exports.json = (body = {}, status = 200) => {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: body != null ? JSON.stringify(body, null, 2) : "",
  };
};

const fetch = require("node-fetch");

async function get_data(tag, platform) {
  const request = await fetch(
    `https://ow-api.com/v1/stats/${platform}/us/${tag}/complete`,
    { method: "GET" }
  );
  if (request.status == 200) return request;
  // 400: bad username, 404: not found.
  else if (!(request.status == 400 || request.status == 404))
    console.log(request.status);
  // if we reach here, we haven't found the response we need
  return null;
}

module.exports = {
  get_data,
};

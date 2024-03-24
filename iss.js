const request = require("request");

const fetchMyIP = (callback) => {
  request(`https://api.ipify.org?format=json`, (error,response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).ip);

  });
};


module.exports = fetchMyIP;
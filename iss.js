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

const fetchCoordsByIP = (ip, callback) => {
  if (!ip) {
    const msg = "There was no IP";
    callback(Error(msg));
  }
  
  request(`http://ipwho.is/${ip}`, (error,response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching geolocation. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const {latitude, longitude, success, message} = JSON.parse(body);
    console.log(success);
    console.log(message);

    if (!success) {
      callback(Error(message), null);
      return;
    }
    callback(null, {latitude, longitude});
  });

};


module.exports = {fetchMyIP, fetchCoordsByIP};

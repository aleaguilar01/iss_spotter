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
    return;
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

    if (!success) {
      callback(Error(message), null);
      return;
    }
    callback(null, {latitude, longitude});
  });

};

const fetchISSFlyOverTimes = (geolocation, callback) => {
  if (!geolocation) {
    const msg = "No coordenates to fetch the ISS";
    callback(Error(msg));
    return;
  }

  request(`https://iss-flyover.herokuapp.com/json/?lat=${geolocation.latitude}&lon=${geolocation.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, JSON.parse(body).response);
  }
  );

};

module.exports = {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes};

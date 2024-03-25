const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error.message);
    return;
  }

  fetchCoordsByIP(ip, (error, geolocation) => {
    if (error) {
      console.log("Couldn´t fetch geolocation", error.message);
      return;
    }
    fetchISSFlyOverTimes(geolocation, (error, issResponse) => {
      if (error) {
        console.log("Couldn´t fetch ISS response", error.message);
        return;
      }
      console.log(issResponse);
    }
    );
  });
});






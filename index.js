const {fetchMyIP, fetchCoordsByIP} = require('./iss');

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
    const {latitude , longitude} = geolocation;
    console.log("latitude", latitude);
    console.log("longitude", longitude);
  });
});






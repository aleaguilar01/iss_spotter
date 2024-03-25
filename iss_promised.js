const request = require('request-promise-native');

const fetchMyIp2 = () => request('https://api.ipify.org?format=json')
  .then(data => JSON.parse(data).ip);


const fetchCoordsByIP = (ip) => request(`http://ipwho.is/${ip}`)
  .then((data) => ({latitude: JSON.parse(data).latitude, longitude: JSON.parse(data).longitude}));

const fetchISSFlyOverTimes = ({latitude, longitude}) => request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
  .then((data) => JSON.parse(data).response);


const printPassTimes = (issResponse) => {
  
  let arr = issResponse.map(pass => {
    let d = new Date(0);
    d.setUTCSeconds(pass.risetime);
    return `Next pass at ${d.toDateString()} ${d.toTimeString()} for ${pass.duration} seconds!`;
  });
  return arr.join("\n");
};


const nextISSTimesForMyLocation = () => fetchMyIp2()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(printPassTimes);


module.exports = {nextISSTimesForMyLocation};
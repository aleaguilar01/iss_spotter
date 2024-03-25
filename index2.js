const {nextISSTimesForMyLocation} = require("./iss_promised");

nextISSTimesForMyLocation()
  .then(console.log)
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });



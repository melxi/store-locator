const NodeGeocoder = require("node-geocoder");
const config = require("./config");

const options = {
  provider: config.GEOCODER_PROVIDER,

  // Optional depending on the providers
  httpAdapter: "https",
  apiKey: config.GEOCODER_KEY,
  formatter: null
};

const geocoder = NodeGeocoder(options);

// Using callback
geocoder.geocode("29 champs elysée paris", function(err, res) {
  // console.log(res);
});

module.exports = geocoder;

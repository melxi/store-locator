require("dotenv").config();

let MONGODB_URI = process.env.MONGODB_URI;
let PORT = process.env.PORT || 3003;
let GEOCODER_PROVIDER = process.env.GEOCODER_PROVIDER;
let GEOCODER_KEY = process.env.GEOCODER_KEY;

module.exports = {
  MONGODB_URI,
  PORT,
  GEOCODER_PROVIDER,
  GEOCODER_KEY
};

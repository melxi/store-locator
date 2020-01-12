const express = require("express");
const { getStores, createStore } = require("../controllers/stores");

const storesRoute = express.Router();

storesRoute
  .route("/")
  .get(getStores)
  .post(createStore);

module.exports = storesRoute;

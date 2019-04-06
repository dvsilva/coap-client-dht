const express = require("express");

const routes = express.Router();

const DashboardController = require("./app/controllers/DashboardController");

routes.get("/", DashboardController.index);

routes.get("/configuration", DashboardController.configuration);
routes.post("/configure", DashboardController.configure);

module.exports = routes;

const moment = require("moment");
const coap = require("node-coap-client").CoapClient;

class DashboardController {
  async index(req, res) {
    const sensors = await coap
      .request("coap://192.168.1.2:5683/sensors/", "get")
      .then(response => {
        return JSON.parse(response.payload.toString("utf8"));
      });

    const actuators = await coap
      .request("coap://192.168.1.2:5683/actuators/led", "get")
      .then(response => {
        return JSON.parse(response.payload.toString("utf8"));
      });

    const appconfig = await coap
      .request("coap://192.168.1.2:5683/app-config", "get")
      .then(response => {
        return JSON.parse(response.payload.toString("utf8"));
      });

    sensors.temperature.dataformatada = moment().format("DD/MM/YYYY HH:mm:ss");
    sensors.humidity.dataformatada = moment().format("DD/MM/YYYY HH:mm:ss");

    return res.render("dashboard", { sensors, actuators, appconfig });
  }

  async configuration(req, res) {
    return res.render("configuration");
  }

  async configure(req, res) {
    var json = {};
    var temp = "temperature";
    var hum = "humidity";

    var tempconf = {
      min: req.body.min_temperature,
      max: req.body.max_temperature
    };
    var humconf = {
      min: req.body.min_humidity,
      max: req.body.max_humidity
    };
    json[temp] = tempconf;
    json[hum] = humconf;

    //console.log(JSON.stringify(json));

    const buf = Buffer.from(JSON.stringify(json));

    await coap.request("coap://192.168.1.2:5683/app-config", "post", buf);

    return res.redirect("/");
  }
}

module.exports = new DashboardController();

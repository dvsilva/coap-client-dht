const coap = require("node-coap-client").CoapClient;

class DashboardController {
  async index(req, res) {
    await coap
      .observe("coap://127.0.0.1:5683/sensors/", "get", resultado => {
        var values = resultado.payload.toString("utf8");
        var sensors = JSON.parse(values);
        //console.log(sensors.temperature);
      })
      .then((result /* true or error code or Error instance */) => {})
      .catch(err => {
        /* handle error */
        console.log("error " + err);
      });

    await coap
      .observe("coap://127.0.0.1:5683/actuators/led", "get", resultado => {
        var values = resultado.payload.toString("utf8");
        var actuators = JSON.parse(values);
        console.log(actuators);
      })
      .then((result /* true or error code or Error instance */) => {})
      .catch(err => {
        /* handle error */
        console.log("error " + err);
      });

    return res.render("dashboard", { sensors, actuators });
  }
}

module.exports = new DashboardController();

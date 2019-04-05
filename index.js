const coap = require("node-coap-client").CoapClient;

coap
  .observe(
    "coap://192.168.1.2:5683/humidity-and-temperature",
    "get",
    resultado => {
      console.log(JSON.stringify(resultado));
    }
  )
  .then((result /* true or error code or Error instance */) => {
    console.log(result);
  })
  .catch(err => {
    /* handle error */
  });

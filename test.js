var sjwt = require("./index");

sjwt.setMode("LOCAL_NC");
var x = sjwt.generateJWT("Hello");
console.log(x);
console.log(sjwt.retrieveJWT(x));
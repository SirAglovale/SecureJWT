var sjwt = require("./index");

sjwt.setKeyPath("./key");
var x = sjwt.generateJWT("Hello", "TESTFINGER");
console.log(x);
console.log(sjwt.retrieveJWT(x, "TESTFINGER"));

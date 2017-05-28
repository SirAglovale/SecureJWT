/**
 * This Project is designed to make JWT more secure by encrypting the payload.
 */

var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var fs = require("fs");

var mode = "LOCAL_NC";
var accepted_modes = [
  "LOCAL_NC",
  "LOCAL_PATH"
];

var jwt_key = generateKey();
var fingerprint = "This is the default fingerprint of sjwt";

module.exports = {
  //This checks that the mode is valid, and then sets the mode based on this, the default is LOCAL_NC or Local Not Clustered.
  setMode: (_mode_) => {
    if(accepted_modes.indexOf(_mode_) > -1)
    {
      mode = _mode_;
      return true;
    }
    else
    {
      return false;
    }
  },
  getMode: () => {
    return mode;
  },
  generateJWT: (payload) => {
    payload = encrypt(payload);
    return jwt.sign(payload, fingerprint);
  },
  retrieveJWT: (j) => {
    j = jwt.verify(j, fingerprint);
    return decrypt(j);
  }
}

function encrypt(payload)
{
  try {
    payload = JSON.stringify(payload);
    var c = crypto.createCipheriv("aes256", Buffer.from(jwt_key.key, "base64"), Buffer.from(jwt_key.iv, "base64"));
    var enc = c.update(payload, "utf8", "base64");
    enc += c.final("base64");
    return enc;
  }
  catch(err)
  {
    throw new Error("There was an error encrypting the payload...");
  }
}

function decrypt(recieved)
{
  try {
    var d = crypto.createDecipheriv("aes256", Buffer.from(jwt_key.key, "base64"), Buffer.from(jwt_key.iv, "base64"));
    var dec = d.update(recieved, "base64", "utf8");
    dec += d.final("utf8");
    return JSON.parse(dec);
  }
  catch(err)
  {
    throw new Error("There was an error decrypting the payload...");
  }
}

function generateKey()
{
  var date = Date();
  var key;
  try {
    fs.statSync("./jwt.key");
    var key = JSON.parse(fs.readFileSync("./jwt.key"));
    return key;
    console.log("File exists");
  }
  catch(err)
  {
    console.log("File does not exist.");
    var data = {
      key: crypto.randomBytes(32).toString("base64"),
      iv: crypto.randomBytes(16).toString("base64")
    };
    fs.writeFileSync("./jwt.key", JSON.stringify(data));
    return data;
  }

}
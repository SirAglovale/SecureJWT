/**
 * This Project is designed to make JWT more secure by encrypting the payload.
 */

var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var fs = require("fs");

var jwt_key = generateKey();

module.exports = {
  //This will set the path of the key, this is important in clustered applications as it allows for keysharing
  setKeyPath: (_path_) => {
    jwt_key = generateKey(_path_);
  },
  //This is the function that constructs the JSON web token
  generateJWT: (payload, fingerprint) => {
    if(payload === undefined || fingerprint === undefined)
    {
      throw new Error("Please use the format: sjwt.generateJWT(payload, fingerprint)");
    }
    payload = encrypt(payload);
    return jwt.sign(payload, fingerprint);
  },
  //This is the function that retrieves the data from the JWT and crypt
  retrieveJWT: (j, fingerprint) => {
    if(j === undefined || fingerprint === undefined)
    {
      throw new Error("Please use the format: sjwt.retrieveJWT(jwt, fingerprint)");
    }
    j = jwt.verify(j, fingerprint);
    return decrypt(j);
  }
}

function encrypt(payload) {
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

function decrypt(recieved, fingerprint) {
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

function generateKey(_keypath_) {
  var path = "./.jwt.key";
  if(_keypath_ != undefined)
  {
    path = _keypath_;
  }
  var key;
  try {
    fs.statSync(path);
    var key = JSON.parse(fs.readFileSync(path));
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
    fs.writeFileSync(path, JSON.stringify(data));
    return data;
  }

}

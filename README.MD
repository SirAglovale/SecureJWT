# SECURE JSON WEB TOKEN LIBRARY

Secure your payloads by adding an extra layer of encryption to your applications, especially when sending data across the internet.

## Install

```bash
npm install securejwt
```

## Usage

### sjwt.setKeyPath(\_path\_)
Sets the location to store sjwt key and (re)generates key.
* \_path\_: \<string\>

### sjwt.generateJWT(payload,fingerprint)
Returns JsonWebToken with aes256 encrypted payload. See [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* payload: \<Object\>|\<Primitive\>|\<Buffer\>
* fingerprint: \<string\>

### sjwt.retrieveJWT(JWTString,fingerprint)
Returns decrypted payload of JWTString
* JWTString: \<string\>
* fingerprint: \<string\>

## Full Example
```javascript
var sjwt = require("securejwt"); // require module

/* Variables */
var keyPath = "~/jwtkeys"; // define keypath
var payload = { "message" : "hello" }; // define payload
var fingerprint = "myFingerPrint"; // define fingerprint

/* Methods */
sjwt.setKeyPath(keyPath); // set key path
var secureToken = sjwt.generateJWT(payload, fingerprint); // generate secureToken
var payload = sjwt.retrieveJWT(secureToken,fingerprint); // decrypt payload

/* Inspection */
console.log(secureToken); // output secureToken to inspect payload
console.log(payload.message); // access payload data
```

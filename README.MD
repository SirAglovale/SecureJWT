# SECURE JSON WEB TOKEN LIBRARY

Secure your payloads by adding an extra layer of encryption to your applications, especially when sending data across the internet.

## Install

```bash
npm install securejwt
```
## Usage
### sjwt.generateJWT(payload,fingerprint,path)
Returns JsonWebToken with aes256 encrypted payload. See [JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)
* payload: Any Valid JavaScript
* fingerprint: <string>
* path: <string>|<URL>


```javascript
var sjwt = require("securejwt");

sjwt.setMode("LOCAL_NC");
var x = sjwt.generateJWT("Hello");
console.log(x);
console.log(sjwt.retrieveJWT(x));
```

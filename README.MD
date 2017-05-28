# SECURE JSON WEB TOKEN LIBRARY

Secure your payloads by adding an extra layer of encryption to your applications, especially when sending data across the internet.

## Install

```bash
npm install securejwt
```
## Usage

```javascript
var sjwt = require("securejwt");

sjwt.setMode("LOCAL_NC");
var x = sjwt.generateJWT("Hello");
console.log(x);
console.log(sjwt.retrieveJWT(x));
```
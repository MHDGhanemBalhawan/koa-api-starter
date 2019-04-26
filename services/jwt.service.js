const jwt = require("jsonwebtoken");
const config = require("../config/config.json");

module.exports = {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config.development.secret, {
      expiresIn: expiresIn
    });
  }
};

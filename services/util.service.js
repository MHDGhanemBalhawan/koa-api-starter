const bcrypt = require("bcrypt");
const SALT_ROUNT = 10;
module.exports = {
  async hashPassword(password) {
    try {
      return await bcrypt.hash(password, SALT_ROUNT);
    } catch (err) {
      throw err;
    }
  },
  async comparePassword(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (err) {
      throw err;
    }
  }
};

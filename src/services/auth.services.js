const Users = require("../models/users.model");
const bcrypt = require("bcrypt");

class AuthServices {
  static async login(username, password) {
    try {
      const result = await Users.findOne({
        where: { username },
      });
      if (result) {
        const isValid = bcrypt.compareSync(password, result.password);
        return isValid ? { isValid, result } : result;
      } else {
        return result;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthServices;

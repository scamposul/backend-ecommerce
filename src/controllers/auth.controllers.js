const AuthServices = require("../services/auth.services");
const jwt = require("jsonwebtoken");

const userLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = await AuthServices.login(username, password);
    const userData = {
      email: data.result.email,
      username: data.result.username,
      password: data.result.password,
      id: data.result.id,
    };
    const token = jwt.sign(userData, "1234", {
      algorithm: "HS512",
      expiresIn: "1h",
    });
    userData.token = token;
    res.json(userData);
  } catch (error) {
    next({
      status: 400,
      errorContent: error,
    });
  }
};

module.exports = userLogin;

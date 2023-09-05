const { Unauthorized } = require("../core/error.response");
const JWT = require("jsonwebtoken");
const checkAuth = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    if (!accessToken) {
      throw new Unauthorized("Unauthorized !", { accessToken });
    }
    const decode = await JWT.verify(accessToken, process.env.PRIVATE_KEY);
    if (!decode) throw new Unauthorized("Unauthorized !");
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { checkAuth };

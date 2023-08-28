const { Unauthorized } = require("../core/error.response");
const { Token } = require("../modules/token/token.model");
const JWT = require("jsonwebtoken");
const checkAuth = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"]?.split(" ")[1];
    const userId = req.headers["x-client-id"];
    const token = await Token.findOne({ user: userId });
    if (!token) {
      throw new Unauthorized("Unauthorized !", { userId });
    }
    console.log(token.publicKey);
    const decode = await JWT.verify(accessToken, token.publicKey);
    if (!decode) {
      throw new Unauthorized("Unauthorized !");
    }
    req.user = decode;
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { checkAuth };

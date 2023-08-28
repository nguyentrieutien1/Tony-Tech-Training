const { Token } = require("./token.model");

class TokenService {
  create = async ({ user, publicKey, refreshToken, accessToken }) => {
    const token = await Token.create({
      user: user._id,
      publicKey,
      refreshToken,
      accessToken,
    });
    return token;
  };
}
module.exports = new TokenService();

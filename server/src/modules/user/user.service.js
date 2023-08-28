const {
  Conflict,
  NotFound,
  BadRequestError,
  Unauthorized,
} = require("../../core/error.response");
const { User } = require("./user.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Token } = require("../token/token.model");
const tokenService = require("../token/token.service");
class UserService {
  signUp = async ({ email, password }) => {
    if (!email || !password)
      throw new BadRequestError("Missing data to signup !", {
        email,
        password,
      });
    //   CHECK USER
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      throw new Conflict("User already exists !", { email });
    }
    // HASH PASSWORD
    password = await bcrypt.hash(password, 10);
    //   CREATE USER
    const user = await User.create({ email, password });
    return {
      user,
    };
  };
  signIn = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound("email or password is incorrect !", { email });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw new BadRequestError("email or password is incorrect !");
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    const accessToken = jwt.sign({ _id: user._id }, privateKey.toString(), {
      algorithm: "RS256",
    });
    const refreshToken = jwt.sign({ _id: user._id }, privateKey.toString(), {
      algorithm: "RS256",
    });
    const token = await tokenService.create({
      user: user._id,
      publicKey,
      refreshToken,
      accessToken,
    });
    return { accessToken, refreshToken, user_id: token.user };
  };
  logout = async ({ _id }) => {
    const token = await Token.findOneAndDelete({ user: _id });
    if (!token) throw new Unauthorized();
    return void 0;
  };
  findOneById = async ({ _id }) => {
    const user = await User.findById(_id);
    if (!user) {
      throw new NotFound("User not found !", { _id });
    }
    return user;
  };
  findOneAndUpdate = async ({ _id, payload }) => {
    if ((!_id, !payload)) {
      throw new BadRequestError("Missing user id or payload !", {
        _id,
        payload,
      });
    }
    const user = await User.findOneAndUpdate({ _id }, payload);
    if (!user) {
      throw new NotFound("User not found !", { _id, payload });
    }
    return user;
  };
  findOneAndDelete = async ({ _id }) => {
    const user = await User.findOneAndDelete({ _id });
    if (!user) {
      throw new NotFound("User not found !", { _id: _id || "undefined" });
    }
    return null;
  };
  findAll = async () => {
    return await User.find();
  };
}
module.exports = new UserService();

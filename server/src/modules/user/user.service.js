const {
  Conflict,
  NotFound,
  BadRequestError,
  Unauthorized,
} = require("../../core/error.response");
const { User } = require("./user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
class UserService {
  static signUp = async ({ email, password }) => {
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
  static signIn = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFound("email or password is incorrect !", { email });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      throw new BadRequestError("email or password is incorrect !");
    const accessToken = jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY);
    return { accessToken };
  };
  // static logout = async ({ _id }) => {
  //   const token = await Token.findOneAndDelete({ user: _id });
  //   if (!token) throw new Unauthorized();
  //   return void 0;
  // };
  // static findOneById = async ({ _id }) => {
  //   const user = await User.findById(_id);
  //   if (!user) {
  //     throw new NotFound("User not found !", { _id });
  //   }
  //   return user;
  // };
  // static findOneAndUpdate = async ({ _id, payload }) => {
  //   if ((!_id, !payload)) {
  //     throw new BadRequestError("Missing user id or payload !", {
  //       _id,
  //       payload,
  //     });
  //   }
  //   const user = await User.findOneAndUpdate({ _id }, payload);
  //   if (!user) {
  //     throw new NotFound("User not found !", { _id, payload });
  //   }
  //   return user;
  // };
  // static findOneAndDelete = async ({ _id }) => {
  //   const user = await User.findOneAndDelete({ _id });
  //   if (!user) {
  //     throw new NotFound("User not found !", { _id: _id || "undefined" });
  //   }
  //   return null;
  // };
  // static findAll = async () => {
  //   return await User.find();
  // };
}
module.exports = {
  UserService,
};

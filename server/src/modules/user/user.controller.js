const { Ok, Success } = require("../../core/success.response");
const { errorHandler } = require("../../helpers/handleError");
const { UserService } = require("./user.service");
class UserController {
  static signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userInfo = await UserService.signUp({ email, password });
      return new Success({
        data: userInfo,
        message: "User has been created !",
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  static signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const userInfo = await UserService.signIn({ email, password });
      return new Success({
        data: userInfo,
        message: "Login successful !",
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  // static logout = async (req, res) => {
  //   try {
  //     const { _id } = req.user;
  //     const result = await UserService.logout({ _id });
  //     return new Ok({
  //       data: result,
  //       message: "logout successful !",
  //     }).send(res);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // };
  // static findOneAndUpdate = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const payload = req.body;
  //     const result = await UserService.findOneAndUpdate({ _id: id, payload });
  //     return new Ok({
  //       message: "Update user successful !",
  //       data: result,
  //     }).send(res);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // };
  // static findOneAndDelete = async (req, res) => {
  //   try {
  //     const { id } = req.body;
  //     const users = await UserService.findOneAndDelete({ _id: id });
  //     return new Ok({
  //       message: "Delete user successful !",
  //       data: users,
  //     }).send(res);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // };
  // static findAll = async (req, res) => {
  //   try {
  //     const result = await UserService.findAll();
  //     return new Ok({
  //       message: "Get users successful !",
  //       data: result,
  //     }).send(res);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // };
  // static findOneById = async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const user = await UserService.findOneById({ _id: id });
  //     return new Ok({ message: "Get user successfull", data: user }).send(res);
  //   } catch (error) {
  //     errorHandler(error, res);
  //   }
  // };
}

module.exports = { UserController };

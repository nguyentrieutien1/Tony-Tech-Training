const { Ok, Success } = require("../../core/success.response");
const { errorHandler } = require("../../helpers/handleError");
const userService = require("./user.service");
class UserController {
  signUp = async (req, res) => {
    const { email, password } = req.body;
    try {
      const userInfo = await userService.signUp({ email, password });
      return new Success({
        data: userInfo,
        message: "User has been created !",
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
      const userInfo = await userService.signIn({ email, password });
      return new Success({
        data: userInfo,
        message: "Login successful !",
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  logout = async (req, res) => {
    try {
      const { _id } = req.user;
      const result = await userService.logout({ _id });
      return new Ok({
        data: result,
        message: "logout successful !",
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOneAndUpdate = async (req, res) => {
    try {
      const { id } = req.params;
      const payload = req.body;
      const result = await userService.findOneAndUpdate({ _id: id, payload });
      return new Ok({
        message: "Update user successful !",
        data: result,
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOneAndDelete = async (req, res) => {
    try {
      const { id } = req.body;
      const users = await userService.findOneAndDelete({ _id: id });
      return new Ok({
        message: "Delete user successful !",
        data: users,
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findAll = async (req, res) => {
    try {
      const result = await userService.findAll();
      return new Ok({
        message: "Get users successful !",
        data: result,
      }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
  findOneById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userService.findOneById({ _id: id });
      return new Ok({ message: "Get user successfull", data: user }).send(res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
}

module.exports = new UserController();

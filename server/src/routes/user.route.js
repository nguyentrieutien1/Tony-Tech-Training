const router = require("express").Router();
const { UserController } = require("./../modules/user/user.controller");
router.post("/signup", UserController.signUp);
router.post("/signin", UserController.signIn);
module.exports = router;

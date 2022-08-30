const express = require("express");
const { register, activateAccount, login } = require("../controller/user");
const router = express.Router();

router.route("/register").post(register);
router.route("/activate").post(activateAccount);
router.route("/login").post(login);
module.exports = router;

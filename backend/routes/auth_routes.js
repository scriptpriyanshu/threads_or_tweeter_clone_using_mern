const express = require("express");
const authController = require("../controllers/auth_controllers");
const authenticateUser = require("../middlewares/authentication");
const router = express.Router();

router.route("/").get(authController.Home);
router.route("/register").post(authController.Register);
router.route("/login").post(authController.Login);
router.route("/profile").get(authenticateUser ,authController.UserProfile);

module.exports = router;

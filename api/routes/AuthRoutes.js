const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/AuthControllers");
const { verify } = require("../middlewares/AuthMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.post("/logout", logout);

module.exports = router;

const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/AuthControllers");
const { verify } = require("../middlewares/AuthMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);

module.exports = router;

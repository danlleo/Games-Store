const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

module.exports.verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "You are not logged in",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

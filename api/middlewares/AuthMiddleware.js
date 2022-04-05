const jwt = require("jsonwebtoken");

module.exports.verify = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden",
        });
      }

      next();
    });
  } catch (err) {
    console.log(err);
  }
};

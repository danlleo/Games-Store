const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const cookie = req.cookies.jwt;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new userModel({ email, password: hashedPassword });
    const token = generateToken(user._id);

    if (!cookie) {
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
      });
    }

    await user.save();
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.login = (req, res) => {
  res.send("Login Post Request");
};

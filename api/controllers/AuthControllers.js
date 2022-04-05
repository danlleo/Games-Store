const userModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30s" }
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

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email || password)) {
      return res.status(400).json({
        message: "Please enter email and password",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password is incorrect",
      });
    }

    const token = generateToken(user._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.sendStatus(200);
  } catch (err) {
    res.send(err);
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.sendStatus(200);
};

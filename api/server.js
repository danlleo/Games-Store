const cookieParser = require("cookie-parser");
const authRouter = require("./routes/AuthRoutes.js");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.DATABASE_ACCESS)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser({ httpOnly: true, secure: true }));
app.use("/api", authRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

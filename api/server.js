const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/AuthRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api", authRoutes);

app.listen(3001, () => {
  console.log("Server is running!");
});

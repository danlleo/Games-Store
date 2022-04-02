const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes/routes");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

dotenv.config();

mongoose
  .connect(process.env.DATABASE_ACCESS, () => {
    console.log("Connected to Database!");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use("/api", routes);

app.listen(3001, () => {
  console.log("Server is running!");
});

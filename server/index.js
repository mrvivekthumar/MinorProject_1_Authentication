const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
dotenv.config("./.env");

//data base connection
mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("database is connected"))
  .catch((err) => console.log("database is not connected", err));

//middleware
app.use(express.json());

app.use("/", require("./routes/authRoutes"));
const port = 8000;

app.listen(port, () => console.log(`server is running on port ${port}`));

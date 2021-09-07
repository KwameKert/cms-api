const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());
const router = require("./routes");
app.use("/api", router);

module.exports = app;

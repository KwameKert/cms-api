const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const app = express();
const schedulers = require("./jobs/eventJobs");

app.use(cors());
app.use(bodyParser.json());
const router = require("./routes");
app.use("/api", router);
schedulers.init();

module.exports = app;

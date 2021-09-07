const express = require("express");
const sermonController = require("../controllers/sermon.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.get("/", sermonController.fetchSermons);
router.post("/", authMiddleware, sermonController.saveSermon);
router.put("/", authMiddleware, sermonController.updateSermon);

module.exports = router;

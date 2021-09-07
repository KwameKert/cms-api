const express = require("express");
const eventController = require("../controllers/event.controller");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

router.post("/", authMiddleware, eventController.createEvent);
router.patch("/", authMiddleware, eventController.updateEvent);
router.get("/latest", eventController.fetchLatestEvent);
router.get("/:id", authMiddleware, eventController.findEvent);
router.get("/latest", eventController.fetchLatestEvent);
router.delete("/:id", authMiddleware, eventController.deleteEvent);
router.get("/", authMiddleware, eventController.fetchEvents);

module.exports = router;

const express = require("express");
const router = express.Router();
const connectController = require("../controllers/connect");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes - simplified for now
router.get("/strava", connectController.connect);

router.get("/strava/callback", connectController.callback);

module.exports = router;

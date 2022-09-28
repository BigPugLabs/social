const express = require("express");
const router = express.Router();
const stravaController = require("../controllers/strava");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// list of all activities
router.get("/activities/:userID", stravaController.getActivities);

// details of a specific activity
router.get("/activity/:activityID", stravaController.getDetailActivity);

//router.delete("/deleteComment/:id", commentController.deletePost);

module.exports = router;

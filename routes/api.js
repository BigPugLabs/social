const express = require("express");
const router = express.Router();
const activityController = require("../controllers/api/activity");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// list of all activities
router.get("/activities/:userID", activityController.getActivities);

router.get("/activitylist", activityController.getActivityList);

// details of a specific activity
router.get("/activity/:activityID", activityController.getActivityDetails);

module.exports = router;

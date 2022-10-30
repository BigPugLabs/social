const express = require("express");
const router = express.Router();
const activityController = require("../controllers/api/activity");
const authController = require("../controllers/api/auth")
// TODO - write api versions of middleware to prevent html and json mixup
const { ensureAuth, ensureGuest } = require("../middleware/auth");

// list of all activities
router.get("/activities/:userID", ensureAuth, activityController.getActivities);

router.get("/activitylist", activityController.getActivityList);

// details of a specific activity
router.get("/activity/:id", ensureAuth, activityController.getActivity);

router.get("/auth/login", authController.getLogin)
router.post("/auth/login", authController.postLogin)

router.get("/auth/logout", ensureAuth, authController.logout)

module.exports = router;

const Post = require("../../models/Post");
const Activity = require("../../models/Activity")
const polyline = require("../helpers/polylineToSVG");

module.exports = {
  getActivity: async (req, res) => {
    try {
      console.log(req.params.id)
      const activity = await Activity.findById(req.params.id)
      const svg = polyline.toSVGObject(activity.summary_polyline)
      //res.render("activity.ejs", { activity: activity, svg: svg, user: req.user, comments: [] })
      res.json({ activity: activity, svg: svg })
    } catch (err) {
      console.error(err)
    }
  },
  getActivityList: async (req, res) => {
    try {
      if (req.user) {
        const activities = await Activity.find({ user: req.user.id }).sort({ start_date: "asc" })
        res.json(activities)
      } else {
        res.json([])
      }
    } catch (err) {
      console.log(err);
    }
  },
  getActivities: async (req, res) => {
    try {
      const activities = await Activity.find({ user: req.user.id }).lean()
      const svg = polyline.multiToSVG(activities.map(e => e.summary_polyline))
      const activity = {
        name: "Multiple rides",
        start_date: activities[0].start_date,
        distance: activities.reduce((acc, c) => acc + c.distance, 0)
      }
      res.render("activity.ejs", { activity: activity, svg: svg, user: req.user, comments: [] })
    } catch (err) {
      console.error(err)
    }
  },
  getActivityDetails: async (req, res) => {
    res.render("TODO")
  }
};

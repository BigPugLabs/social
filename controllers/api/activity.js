const Post = require("../../models/Post");
const Activity = require("../../models/Activity")
const polyline = require("../helpers/polylineToSVG");

module.exports = {
  getActivity: async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id)
      const svg = polyline.toSVG(activity.summary_polyline)
      //res.render("activity.ejs", { activity: activity, svg: svg, user: req.user, comments: [] })

    } catch (err) {
      console.error(err)
    }
  },
  getActivityList: async (req, res) => {
    try {
      //const posts = await Post.find({ user: req.user.id });
      //const activities = await Activity.find({ user: req.user.id }).sort({ start_date: "asc" })
      const activities = await Activity.find({}).sort({ start_date: "asc" })
      //console.log(activities)
      //res.render("profile.ejs", { posts: posts, user: req.user, activities: activities });
      res.json(activities)
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
    res.render("foo")
  }
};

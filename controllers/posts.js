const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User")
const Activity = require("../models/Activity")
const polyline = require("./helpers/polylineToSVG");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const posts = await Post.find({ user: req.user.id });
      const activities = await Activity.find({ user: req.user.id }).sort({ start_date: "asc" })
      //console.log(activities)
      res.render("profile.ejs", { posts: posts, user: req.user, activities: activities });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      const comments = await Comment.find({ post: req.params.id }).populate("user", "userName").sort({ createdAt: "ascending" }).lean()
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  getActivity: async (req, res) => {
    try {
      const activity = await Activity.findById(req.params.id)
      const svg = polyline.toSVG(activity.summary_polyline)
      res.render("activity.ejs", { activity: activity, svg: svg, user: req.user, comments: [] })
    } catch (err) {
      console.error(err)
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
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};

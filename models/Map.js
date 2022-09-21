const mongoose = require("mongoose");

const MapSchema = new mongoose.Schema({
  strava_map_ID: {
    type: String,
    required: true,
  },
  polyline: {
    type: String,
    required: true,
  },
  summary_polyline: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Activity",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Map", MapSchema);

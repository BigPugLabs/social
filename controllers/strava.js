const User = require("../models/User");
const Activity = require("../models/Activity");
const StravaProfile = require("../models/StravaProfile");

module.exports = {
    getActivities: async (req, res) => {
        try {
            const athlete = await User.findOne({ _id: req.user.id }).populate('stravaProfile')
            const response = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=30",
                {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + athlete.stravaProfile.accessToken
                    }
                })
            let json = await response.json()
            if (json.errors) {
                // refresh token and try again
                const refresh = await fetch("https://www.strava.com/api/v3/oauth/token", {
                    body: `client_id=${process.env.STRAVA_CLIENT_ID}&client_secret=${process.env.STRAVA_CLIENT_SECRET}&refresh_token=${athlete.stravaProfile.refreshToken}&grant_type=refresh_token`,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    method: "POST"
                })
                const refreshJSON = await refresh.json()
                console.log(refreshJSON)
                // TODO - check if callback is needed, seemed to fail without
                StravaProfile.updateOne({ _id: athlete.stravaProfile._id },
                    {
                        accessToken: refreshJSON.access_token,
                        refreshToken: refreshJSON.refresh_token,
                        tokenRefreshed: Date.now()
                    }, (err, res)=>{console.log(err, res)})
                const retry = await fetch("https://www.strava.com/api/v3/athlete/activities?per_page=30",
                    {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + refreshJSON.access_token
                        }
                    })
                json = await retry.json()
            }
            if (!json.errors) {
                let ops = json.map(e => ({
                    updateOne: {
                        filter: { strava_activity_ID: e.id },
                        update: {
                            user: req.user.id,
                            name: e.name,
                            distance: e.distance,
                            moving_time: e.moving_time,
                            elapsed_time: e.elapsed_time,
                            elevation_gain: e.total_elevation_gain,
                            start_date: e.start_date,
                            start_date_local: e.start_date_local,
                            timezone: e.timezone,
                            utc_offset: e.utc_offset,
                            start_latlng: e.start_latlng.toString(),
                            end_latlng: e.end_latlng.toString(),
                            map_id: e.map.id,
                            summary_polyline: e.map.summary_polyline,
                            max_speed: e.max_speed,
                            avg_watts: e.average_watts,
                            kilojoules: e.kilojoules,
                            calories: e.calories
                        },
                        upsert: true
                    }
                }))
                await Activity.bulkWrite(ops)
            }
            res.redirect("/profile")
        } catch (error) {
            console.error(error)
        }
    },
    getDetailActivity: async (req, res) => {
        // TODO - yep, todo
    },
};

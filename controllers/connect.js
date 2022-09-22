const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");

module.exports = {
    connect: async (req, res, next) => {
        console.log("connecting")
        await passport.authorize("strava", { failureRedirect: '/profile' })(req, res, next)
    },
    callback: async (req, res, next) => {
        console.log("callback")
        await passport.authorize('strava', { failureRedirect: '/profile' })(req, res, next),
            function (req, res) {
                var user = req.user;
                var account = req.account;

                // Associate the strava account with the logged-in user.
                account.userId = user.id;
                account.save(function (err) {
                    if (err) { return self.error(err); }
                    self.redirect('/profile');
                });
            }
    }
}
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("../models/User");

module.exports = {
    connect: async (req, res, next) => {

        await passport.authorize("strava", { failureRedirect: '/profile' })(req, res, next)
    },
    callback: async (req, res, next) => {
        //console.log("callback", req)
        await passport.authorize('strava', { failureRedirect: '/fail' })(req, res, next),
            function (req, res) {
                console.log("callback", req.account)
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
const express = require("express");
const router = express.Router();
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Connect Routes - simplified for now

router.get("/strava", passport.authorize("strava", { failureRedirect: '/fail1' }))

router.get("/strava/callback", passport.authorize('strava', { failureRedirect: '/profile' }),
function (req, res) {
    console.log("callback", req.account)
    var user = req.user;
    var account = req.account;

    // Associate the strava account with the logged-in user.
    account.userId = user.id;
    account.save(function (err) {
        if (err) { console.error(err); }
        res.redirect('/profile');
    });
})

module.exports = router;

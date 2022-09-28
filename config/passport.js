const LocalStrategy = require("passport-local").Strategy;
const StravaStrategy = require("passport-strava").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const StravaProfile = require("../models/StravaProfile")

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );
  passport.use(new StravaStrategy({
    clientID: process.env.STRAVA_CLIENT_ID,
    clientSecret: process.env.STRAVA_CLIENT_SECRET,
    scope: "activity:read",
    callbackURL: "http://192.168.0.11:3003/connect/strava/callback",
    passReqToCallback: true
  },
    async (req, accessToken, refreshToken, profile, cb) => {
      try {
        // TODO - consider moving some of this stuff into the User or the session at some stage?
        const filter = {
          stravaID: profile.id
        }
        const update = {
          displayName: profile.displayName,
          firstName: profile.name.first,
          lastName: profile.name.last,
          avatar: profile.avatar,
          city: profile._json.city,
          state: profile._json.state,
          country: profile._json.country,
          stravaCreatedAt: profile._json.created_at,
          stravaUpdatedAt: profile._json.updated_at,
          accessToken: accessToken,
          refreshToken: refreshToken
        }
        const stravaProfile = await StravaProfile.findOneAndUpdate(filter, update, { new: true, upsert: true })
        await User.findOneAndUpdate({ _id: req.user.id },
          { stravaProfile: stravaProfile.id },
          function (err, user) { return cb(err, user) }
        )
      } catch (err) {
        console.error(err)
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

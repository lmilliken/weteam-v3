const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
const User = mongoose.model('users');

const config = require('../config/config');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({
        providedId: profile.id,
        provider: 'Google'
      });

      if (existingUser) {
        //user already exists
        done(null, existingUser); //null is the error object
      } else {
        const createdUser = await new User({
          providedId: profile.id,
          provider: 'Google'
        }).save();

        done(null, createdUser);
      }
    }
  )
);

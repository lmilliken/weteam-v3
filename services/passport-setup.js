const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');

//do it this way to prevent mongoose from importing several models if you are running several other files
//const mongoose = require('mongoose');
// const User = mongoose.model('users');
const User = require('./../models/User');
const config = require('../config/config');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  User.findById(userID).then((user) => {
    done(null, user);
  });
});

//don't start on this until you get user set up in db
// passport.use(new LocalStrategy){return null}

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile.photos);
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
          provider: 'Google',
          profileImage: profile._json.image.url,
          nameFirst: profile.name.givenName,
          nameLast: profile.name.familyName,
          activeFlags: { verifiedEmailOrProvider: true }
        }).save();

        done(null, createdUser);
      }
    }
  )
);

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const LocalStrategy = require('passport-local');

//do it this way to prevent mongoose from importing several models if you are running several other files
//const mongoose = require('mongoose');
// const User = mongoose.model('users');
const User = require('./../models/User');
const config = require('../config/config');

passport.serializeUser((user, done) => {
  // console.log('user serialized');
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  // console.log('user DEserialized');
  User.findById(userID).then((user) => {
    done(null, user);
  });
});

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
//don't start on this until you get user set up in
passport.use(User.createStrategy()); //local strategy, according to https://github.com/saintedlama/passport-local-mongoose
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: 'email'
//     },
//     function(email, password, done) {
//       User.findOne({ email: email }, async function(err, user) {
//         // console.log('user in password local: ', user);
//         // const verified = await user.verifyPassword(password);
//         // console.log('verify password: ', verified);
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           return done(null, false);
//         }
//         if (!(await user.verifyPassword(password))) {
//           console.log('passwords do not match');
//           // throw Error('invalid credentials');
//           return done(null, false);
//         }
//         return done(null, user);
//       });
//     }
//   )
// );
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log(profile.photos);
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

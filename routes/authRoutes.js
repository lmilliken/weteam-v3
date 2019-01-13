const passport = require('passport');

const Mailer = require('../services/Mailer');
const emailVerifyTemplate = require('../services/emailTemplates/emailVerifyTemplate');
const User = require('./../models/User');

module.exports = (app) => {
  app.get('/api/emailverification/:emailToken', async (req, res) => {
    console.log('email token: ', req.params.emailToken);

    user = await User.findOneAndUpdate(
      { emailVerificationToken: req.params.emailToken },
      {
        $set: {
          'activeFlags.verifiedEmailOrProvider': true,
          emailVerificationToken: ''
        }
      },
      { new: true }
    );

    if (user) {
      console.log('user found: ', user);
      await user.updateActiveStatus();
    } else {
      console.log('user not found');
      res.send('user not found');
    }

    res.redirect('/profile');
  });

  app.get('/auth/resendemailverficiation', async (req, res) => {
    console.log('resend email called: ', req.user);
    const { email, emailVerificationToken } = req.user;
    const mailer = new Mailer(
      email,
      'no-reply@weteam.org',
      'Activate your WeTeam account',
      emailVerifyTemplate(emailVerificationToken)
    );
    try {
      const mailRes = await mailer.send();
      // console.log({ mailRes });
      res.send('email sent');
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  app.post(
    '/auth/login',
    passport.authenticate('local', { failureRedirection: '/' }),
    (req, res) => {
      console.log('/auth/login called: ', req.user);
      res.send('/auth/login called');
    }
  );

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/profile');
    }
  );

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

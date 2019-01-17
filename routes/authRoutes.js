const passport = require('passport');

const Mailer = require('../services/Mailer');
const emailVerifyTemplate = require('../services/emailTemplates/emailVerifyTemplate');
const User = require('./../models/User');

module.exports = (app) => {
  app.get('/auth/resendemailverfication', async (req, res) => {
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

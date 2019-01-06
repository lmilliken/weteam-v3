//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
const crypto = require('crypto');
const ExpertArea = mongoose.model('expertareas');
const User = mongoose.model('users');

const Mailer = require('../services/Mailer');
const emailVerifyTemplate = require('../services/emailTemplates/emailVerifyTemplate');

module.exports = (app) => {
  app.post('/api/register', async (req, res) => {
    console.log('/registered called: ', req.body);
    const emailToken = crypto.randomBytes(48).toString('hex');
    //add a token to the request
    req.body.emailVerificationToken = emailToken;
    //console.log('new rreq.body);
    const mailer = new Mailer(
      req.body.email,
      'no-reply@weteam.org',
      'Activate your WeTeam account',
      emailVerifyTemplate(emailToken)
    );
    try {
      const newUser = await new User(req.body).save();
      console.log({ newUser });
      const mailRes = await mailer.send();
      console.log({ mailRes });
      res.send('message from server at /register');
    } catch (err) {
      console.log(err);
      res.status(422).send(err);
    }
  });

  app.post('/api/checkdupemail', async (req, res) => {
    user = await User.find({ email: req.body.email });

    if (user.length) {
      console.log('user found: ', user);
    } else {
      console.log('new user');
    }
  });

  app.post('/api/emailverification/:emailToken', async (req, res) => {
    console.log('email token: ', req.params.emailToken);
    res.send('finished');
    // user = await User.find({ email: req.body.email });

    // if (user.length) {
    //   console.log('user found: ', user);
    // } else {
    //   console.log('new user');
    // }
  });

  app.get('/api/expertareas', async (req, res) => {
    const areas = await ExpertArea.find();
    res.send(areas);
  });
};

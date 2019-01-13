//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
// const User = mongoose.model('users');
const crypto = require('crypto');
const Mailer = require('../services/Mailer');
const emailVerifyTemplate = require('../services/emailTemplates/emailVerifyTemplate');

const router = require('express').Router();
const User = require('./../models/User');

router.post('/register', async (req, res) => {
  // console.log('/registered called: ', req.body);
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
    // console.log({ newUser });
    const mailRes = await mailer.send();
    // console.log({ mailRes });
    res.send('message from server at /register');
  } catch (err) {
    console.log('something went wrong: ', err);
    res.status(422).send(err);
  }
});

module.exports = router;

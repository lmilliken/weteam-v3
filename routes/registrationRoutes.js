//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
// const User = mongoose.model('users');
const crypto = require('crypto');
const Mailer = require('../services/Mailer');
const emailVerifyTemplate = require('../services/emailTemplates/emailVerifyTemplate');

const router = require('express').Router();
const User = require('./../models/User');

validateRegister = (req, res, next) => {
  req.san;
};

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
    const newUser = new User(req.body);
    await User.register(newUser, req.body.password)
      .then()
      .catch((err) => {
        console.log('error in registering user: ', err);
        res.status(400).send();
      }); //register is provided by the passportLocalMongoose plugin, see the User model

    // console.log({ newUser });
    const mailRes = await mailer.send();
    // console.log({ mailRes });
    res.send('message from server at /register');
  } catch (err) {
    console.log('something went wrong: ', err);
    res.status(422).end();
  }
});

router.get('/emailverification/:emailToken', async (req, res) => {
  //  console.log('email token: ', req.params.emailToken);

  user = await User.findOneAndUpdate(
    { emailVerificationToken: req.params.emailToken },
    {
      $set: {
        'activeFlags.verifiedEmailOrProvider': true
        // emailVerificationToken: ''
      }
    },
    { new: true }
  );

  if (user) {
    //  console.log('user found: ', user);
    await user.updateActiveStatus();
    req.login(user, (err) => {
      if (err) {
        throw Error(err);
      }
      return res.redirect('/profile');
    });
  } else {
    //    console.log('user not found!');
    return res.status(400).send('user not found');
  }
});

module.exports = router;

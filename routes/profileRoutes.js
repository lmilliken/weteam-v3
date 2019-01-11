//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
const ExpertArea = mongoose.model('expertareas');
// const User = mongoose.model('users');
const User = require('./../models/User');
const router = require('express').Router();
// module.exports = (app) => {
//   app.post('/update', async (req, res) => {
//     res.send('response from profileRouts');
//   });
// };

const Mailer = require('../services/Mailer');
const emailVerifyTemplate = require('../services/emailTemplates/emailVerifyTemplate');

router.post('/update', async (req, res) => {
  // console.log('body: ', req.body);
  // console.log('user: ', req.user);

  // User.findByIdAndUpdate(req.user._id, req.body, { new: true }).then((ret) =>
  //   console.log({ ret })
  // );
  // res.send('response from profileRoutes');

  //find which field they are trying to update from the request body:  { about: 'jk;' }
  const field = Object.keys(req.body)[0];
  // console.log({ field });

  //update the request.user itself
  req.user[field] = req.body[field];
  const updatedUser = await req.user.save();
  res.send(updatedUser);
});

router.get('/resendemailverficiation', async (req, res) => {
  // console.log('resend email called: ', req.user);
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
module.exports = router;

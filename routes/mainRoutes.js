//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');

const ExpertArea = mongoose.model('expertareas');
const RequestStatus = mongoose.model('requeststatuses');
//const User = mongoose.model('users');
const User = require('./../models/User');

module.exports = (app) => {
  app.post('/api/agreetoterms', async (req, res) => {
    console.log(req.user);
    req.user.activeFlags.agreedToTerms = new Date();
    const updatedUser = await req.user.save();
    console.log({ updatedUser });
    await updatedUser.updateActiveStatus();
    console.log({ updatedUser });
    res.send(updatedUser);
    //res.send('/agreed to terms called');
  });

  app.get('/api/expertareas', async (req, res) => {
    const areas = await ExpertArea.find();
    res.send(areas);
  });

  app.get('/api/requeststatuses', async (req, res) => {
    //    console.log('statuses called');
    const statuses = await RequestStatus.find();
    // console.log({ statuses });
    res.send(statuses);
  });

  app.post('/api/checkdupemail', async (req, res) => {
    user = await User.find({ email: req.body.email });

    if (user.length) {
      console.log('user found: ', user);
      res.send(true);
    } else {
      console.log('new user');
      res.send(false);
    }
  });
};

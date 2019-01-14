//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');

const ExpertArea = mongoose.model('expertareas');
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
};

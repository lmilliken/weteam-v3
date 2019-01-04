//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
const crypto = require('crypto');
const ExpertArea = mongoose.model('expertareas');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/register', async (req, res) => {
    console.log('/registered called: ', req.body);
    const emailToken = crypto.randomBytes(48).toString('hex');
    //add a token to the request
    req.body.emailVerificationToken = emailToken;
    //console.log('new rreq.body);
    const newUser = await new User(req.body).save();
    console.log({ newUser });
    res.send('message from server at /register');
  });

  app.get('/api/expertareas', async (req, res) => {
    const areas = await ExpertArea.find();
    res.send(areas);
  });
};

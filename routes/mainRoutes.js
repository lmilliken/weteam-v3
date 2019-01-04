//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
const ExpertArea = mongoose.model('expertareas');
const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/register', async (req, res) => {
    console.log('/registered called: ', req.body);
    res.send('message from server at /register');
  });

  app.get('/api/expertareas', async (req, res) => {
    const areas = await ExpertArea.find();
    res.send(areas);
  });
};

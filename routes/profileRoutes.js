//do it this way to prevent mongoose from importing several models if you are running several other files
const mongoose = require('mongoose');
const ExpertArea = mongoose.model('expertareas');
const User = mongoose.model('users');

const router = require('express').Router();
// module.exports = (app) => {
//   app.post('/update', async (req, res) => {
//     res.send('response from profileRouts');
//   });
// };

router.post('/update', (req, res) => {
  console.log('body: ', req.body);
  console.log('user: ', req.user);

  User.findByIdAndUpdate(req.user._id, req.body).then((ret) =>
    console.log({ ret })
  );
  res.send('response from profileRoutes');
});
module.exports = router;

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

router.post('/update', async (req, res) => {
  // console.log('body: ', req.body);
  // console.log('user: ', req.user);

  // User.findByIdAndUpdate(req.user._id, req.body, { new: true }).then((ret) =>
  //   console.log({ ret })
  // );
  // res.send('response from profileRoutes');
  req.user.expertAreas = req.body.expertAreas;
  const updatedUser = await req.user.save();
  res.send(updatedUser);
});
module.exports = router;
